

import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";
import { useAuth } from "../context/AuthContext";

const Alerts = () => {

    const { user } = useAuth();

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        const fetchAlerts = async () => {

            try {

                const response = await api.get("/alerts");

                setAlerts(response.data.alerts);
            }
            
            catch(error) {
                console.error("Failed to fetch alerts:", error);
            }
        };

        fetchAlerts();
    }, []);



    useEffect(()=> {

        const handleNewAlert = (newAlert)=> {
            setAlerts((currentAlerts)=> {
                return [newAlert, ...currentAlerts];
            });
        }

        socket.on("newAlert", handleNewAlert);

        return()=> {
            socket.off("newAlert", handleNewAlert);
        }
    }, []);

    const handleAcknowledge = async(alertId)=> {

    try {

        const response = await api.put(`/alerts/${alertId}/acknowledge`);

        const updatedAlert = response.data.alert;

        setAlerts((currentAlerts)=> {

            const newAlerts = currentAlerts.map((alert)=> {

                if(alert._id === updatedAlert._id) {
                    return updatedAlert;
                }

                return alert
            });

            return newAlerts;
        })
    }

        catch(error) {
            console.error('Failed to acknowledge alert:', error.response?.data || error.message)
        }
    }
    

    return (

        <div>
            <h1>Alerts</h1>

            {alerts.length === 0 ? (
                <p>No alerts found.</p>) : (alerts.map((alert)=> (

                    <div key={alert._id}>

                        <p>
                            {alert.message}
                        </p>

                        <p>
                            Severity: {alert.severity}
                        </p>

                        <p>
                            Status: {alert.status}
                        </p>

                        {(
                            user?.role === "admin" || user?.role === "operator") && alert.status === "active" && (
                                <button
                                    onClick={()=> handleAcknowledge(alert._id)}>
                                    Acknowledge
                                </button>
                            )}

                    </div>
                ))
            )}
        </div>
    );
};

export default Alerts;
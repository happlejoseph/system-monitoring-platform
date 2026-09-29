

import { useEffect, useState } from 'react';
import socket from '../services/socket';
import api from '../services/api';
import MetricChart from "../components/MetricChart";


const Dashboard = ()=> {

    const [metric, setMetric] = useState(null);

    const [alerts, setAlerts] = useState([]);

    useEffect(()=> {

        socket.on('newMetric', (metricData)=> {
            console.log('New metric received', metricData);

            setMetric(metricData);
        });

        socket.on('newAlert', (alertData)=> {
            console.log('New alert received');

            setAlerts((previousAlerts)=> [
                alertData,
                ...previousAlerts
            ]);
            
        })

        return()=> {
            socket.off('newMetric');
            socket.off('newAlert')
        };
    }, []);



    // alerts //
    useEffect(()=> {

        const fetchAlerts = async()=> {

            try {

                const response = await api.get('/alerts');
                console.log('Alerts received:', response.data);
                
                setAlerts(response.data.alerts);
            }

            catch(error) {
                console.error("Failed to fetch alerts:", error);
                
            }
        };

        fetchAlerts();
    }, []);


    useEffect(()=> {

        const fetchLatestMetric = async()=> {

            try {

                const response = await api.get('/metrics');

                const metrics = response.data.metrics;

                if(metrics.length > 0) {
                    setMetric(metrics[metrics.length - 1]);
                }
            }

            catch(error) {
                console.error('Failed to fetch metrics:', error);
            }
        };

        fetchLatestMetric
    }, [])

    return (

        <div>
            <h1>System Monitoring Dashboard</h1>

            {metric && (
                <div>
                    <h2>System Metrics</h2>

                    <div>
                        <MetricChart
                            value={metric.cpu}
                            label="CPU"
                        />

                        <MetricChart
                            value={metric.memory}
                            label="Memory"
                        />

                        <MetricChart
                            value={metric.disk}
                            label="Disk"
                        />
                    </div>

                    <div>
                        <h3>Temperature</h3>
                        <p>{metric.temperature}°C</p>
                    </div>

                    <div>
                        <h3>Fan Speed</h3>
                        <p>{metric.fanSpeed} RPM</p>
                    </div>
                </div>
            )}

            {!metric && (
                <p>Waiting for system metrics...</p>
            )}

            <div>
                <h2>Alerts</h2>
                <p>Total Alerts: {alerts.length}</p>
            </div>
        </div>
    );

}

export default Dashboard;
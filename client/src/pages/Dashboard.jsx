

import { useEffect, useState } from 'react';
import socket from '../services/socket';
import api from '../services/api';
import MetricChart from "../components/MetricChart";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar} from "recharts";



const Dashboard = ()=> {

    const [metric, setMetric] = useState(null);

    const [alerts, setAlerts] = useState([]);

    const [servers, setServers] = useState([]);

    const [metrics, setMetrics] = useState([]);

    useEffect(()=> {

        socket.on('newMetric', (metricData)=> {
            console.log('New metric received', metricData);

            setMetric(metricData);

            setMetrics((previousMetrics)=> {
                const updatedMetrics = [...previousMetrics, metricData];

                return updatedMetrics.slice(-20);
            })
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
            socket.off('newAlert');
        };
    }, []);


    useEffect(()=> {

        const fetchServers = async()=> {

            try {

                const response = await api.get('/servers');

                setServers(response.data.servers);
            }

            catch(error) {
                console.error('Failed to fetch servers:', error);
            }
        }

        fetchServers();
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

                const fetchedMetrics = response.data.metrics;

                if(fetchedMetrics.length > 0) {
                    setMetric(fetchedMetrics[fetchedMetrics.length - 1]);

                    setMetrics(fetchedMetrics.slice(-20));
                }
            }

            catch(error) {
                console.error('Failed to fetch metrics:', error);
            }
        };

        fetchLatestMetric();
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

        
        {metrics.length > 0 && (
            <div>
                <h2>CPU, Memory & Disk Trends</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metrics}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) =>
                                new Date(value).toLocaleTimeString()
                            }
                        />

                        <YAxis domain={[0, 100]} />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="cpu"
                            name="CPU"
                            stroke="#8884d8"
                        />

                        <Line
                            type="monotone"
                            dataKey="memory"
                            name="Memory"
                            stroke="#82ca9d"
                        />

                        <Line
                            type="monotone"
                            dataKey="disk"
                            name="Disk"
                            stroke="#ffc658"
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )}

        
        {metrics.length > 0 && (
            <div>
                <h2>Temperature & Fan Speed Trends</h2>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metrics}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) =>
                                new Date(value).toLocaleTimeString()
                            }
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="temperature"
                            name="Temperature"
                            stroke="#ff7300"
                        />

                        <Line
                            type="monotone"
                            dataKey="fanSpeed"
                            name="Fan Speed"
                            stroke="#0088FE"
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        )}

        
        <div>
            <h2>Monitored Servers</h2>

            <p>
                Total Servers: {servers.length}
            </p>

            <p>
                Online Servers:{" "}
                {
                    servers.filter(
                        (server) =>
                            server.connectionStatus === "online"
                    ).length
                }
            </p>

            <p>
                Offline Servers:{" "}
                {
                    servers.filter(
                        (server) =>
                            server.connectionStatus === "offline"
                    ).length
                }
            </p>

            {servers.map((server) => (
                <div key={server._id}>

                    <h3>{server.name}</h3>

                    <p>
                        Hostname: {server.hostname}
                    </p>

                    <p>
                        Connection: {server.connectionStatus}
                    </p>

                    <p>
                        Last Seen:{" "}
                        {
                            server.lastSeen
                                ? new Date(
                                    server.lastSeen
                                ).toLocaleString()
                                : "Never"
                        }
                    </p>

                </div>
            ))}
        </div>

        <div>
            <h2>Alerts</h2>

            <p>
                Active Alerts:{" "}
                {
                    alerts.filter(
                        (alert) =>
                            alert.status === "active"
                    ).length
                }
            </p>
        </div>

    </div>
    );

}

export default Dashboard;
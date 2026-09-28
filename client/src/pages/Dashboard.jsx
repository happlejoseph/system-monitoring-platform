

import { useEffect, useState } from 'react';
import socket from '../services/socket';
import MetricChart from "../components/MetricChart";


const Dashboard = ()=> {

    const [metric, setMetric] = useState(null);

    useEffect(()=> {

        socket.on('newMetric', (metricData)=> {
            console.log('New metric received', metricData);

            setMetric(metricData);
        });

        return()=> {
            socket.off('newMetric');
        };
    }, []);

    return (

        <div>
            <h1>System Monitoring Dashboard</h1>

            {metric && (
                <div>
                    <MetricChart value={metric.cpu} label="CPU" />
                    <MetricChart value={metric.memory} label="Memory" />
                    <MetricChart value={metric.disk} label="Disk" />

                    <div>
                        <h3>Temperature</h3>
                        <p>{metric.temperature}°C</p>
                    </div>

                    <div>
                        <h3>Fan Speed</h3>
                        <p>{metric.fanSpeed} RPM</p>
                    </div>

                    <p>CPU: {metric.cpu}%</p>
                    <p>Memory: {metric.memory}%</p>
                    <p>Disk: {metric.disk}%</p>

                </div>
            )}
        </div>
    )
}

export default Dashboard;
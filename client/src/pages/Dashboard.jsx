

import { useEffect, useState } from 'react';
import socket from '../services/socket';


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
                    
                    <p>CPU: {metric.cpu}%</p>
                    <p>Memory: {metric.memory}%</p>
                    <p>Disk: {metric.disk}%</p>
                    <p>Temperature: {metric.temperature}°C</p>
                    <p>Fan Speed: {metric.fanSpeed}</p>

                </div>
            )}
        </div>
    )
}

export default Dashboard;
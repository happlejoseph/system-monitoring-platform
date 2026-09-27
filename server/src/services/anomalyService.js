

import Alert from "../models/Alert.js";


export const createAlert = async(server, metric, message)=> {

    try {

        const alert = await Alert.create({
            server, metric, message, severity: 'high'
        });
        return alert
    }

    catch(error) {
        console.log('Failed to create alert', error.message);
        return null;
        
    }
}



export const checkAnomaly = (metric)=> {

    const anomalies = [];

    if(metric.cpu > 90) {
        anomalies.push('High cpu usage');
    }

    if(metric.memory > 90) {
        anomalies.push('High memory usage');
    }

    if(metric.disk > 90) {
        anomalies.push('High disk usage');
    }

    if(metric.temperature > 90) {
        anomalies.push('High temperature');
    }

    return anomalies;
};


import Alert from "../models/Alert.js";
import { sendEmail } from "./emailService.js";


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




export const createAlert = async(server, metric, message)=> {

    try {

        const existingAlert = await Alert.findOne({
            server, message, status: 'active'
        });

        if(existingAlert) {
            return null;
        }

        const alert = await Alert.create({
            server, metric, message, severity: 'high'
        });

        console.log("Alert created:", alert._id);
        console.log("Sending alert email...");

        await sendEmail(
            process.env.EMAIL_USER,
            'System Monitoring Alert',
            `Alert: ${message}`
        )

        return alert;
    }
    
    catch(error) {
        console.log('Failed to create alert', error.message);
        return null;
        
    }
}
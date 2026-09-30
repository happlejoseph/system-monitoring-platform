

import axios from "axios";
import { getHardwareMetrics } from "../monitoring/hardwareMonitor.js";
import Settings from "../models/Settings.js";
import { getSimulatedMetrics } from "../monitoring/simulatedMonitor.js";



export const sendHardwareMetrics = async()=> {
    
    try {

        const settings = await Settings.findOne();

        let metrics;

        if(settings?.dataSource === 'simulated') {
            metrics = getSimulatedMetrics();
        }
        else{
            metrics = await getHardwareMetrics();
        }

        await axios.post(
            `${process.env.MONITORING_SERVER_URL}/api/metrics`,
            {
                server: process.env.MONITORED_SERVER_ID,
                ...metrics
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.MONITORING_TOKEN}`
                }
            }
        );

        console.log("Hardware metrics sent successfully");
    }

    catch(error) {
        console.error('Failed to send hardware metrics:', error.response?.data || error.message)
    }
};



export const startHardwareMonitoring = ()=> {

    setInterval(async()=> {
        await sendHardwareMetrics();
    }, 5000);
};
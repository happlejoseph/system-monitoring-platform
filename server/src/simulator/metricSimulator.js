

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const SERVER_ID = "6ab8bf68d22f887566e566d7";


const generateMetric = ()=> {

    return{
        server: SERVER_ID,
        cpu: Math.floor(Math.random() * 101),
        memory: Math.floor(Math.random() * 101),
        disk: Math.floor(Math.random() * 101),
        temperature: Math.floor(Math.random() * 81) + 20,
        fanSpeed: Math.floor(Math.random() * 3001) + 1000
    };
}


const sendMetric = async()=> {
    
    const metric = generateMetric();

    await axios.post(

        "http://localhost:3001/api/metrics",
        metric,
        {
            headers: {
                Authorization: `Bearer ${process.env.MONITORING_TOKEN}`
            }
        }
    )
}

setInterval(sendMetric, 5000);


import Alert from "../models/Alert.js";


export const getAlerts = async(req, res)=> {

    try {

        const alerts = await Alert.find()
            .populate('server')
            .populate('metric');
            
        res.status(200).json({
            message: 'Alerts fetched successfully',
            alerts
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
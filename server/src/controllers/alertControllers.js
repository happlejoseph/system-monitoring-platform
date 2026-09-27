

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



export const acknowledgeAlert = async(req, res)=> {

    try {

        const {id} = req.params;

        const alert = await Alert.findByIdAndUpdate(
            id,
            {status: 'acknowledged'}, {new: true}
        );

        if(!alert) {
            return res.status(404).json({
                message: 'Alert not found'
            });
        }

        res.status(200).json({
            message: 'Alert acknowledged successfully',
            alert
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
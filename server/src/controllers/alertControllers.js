

import Alert from "../models/Alert.js";
import { createAuditLog } from "./auditLogController.js";
import { getIO } from "../socket.js";


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



export const acknowledgeAlert = async (req, res) => {

    try {

        const { id } = req.params;

        const alert = await Alert.findById(id);

        if (!alert) {
            return res.status(404).json({
                message: "Alert not found"
            });
        }

        if (alert.status === "acknowledged") {
            return res.status(400).json({
                message: "Alert is already acknowledged"
            });
        }

        alert.status = "acknowledged";
        alert.acknowledgedBy = req.user.id;

        await alert.save();

        await alert.populate("server");
        await alert.populate("metric");
        await alert.populate("acknowledgedBy", "name email role");

        await createAuditLog(
            req.user.id,
            "ACKNOWLEDGE_ALERT",
            `Acknowledged alert: ${alert.message}`
        );

        const io = getIO();

        io.emit("alertUpdated", alert);

        res.status(200).json({
            message: "Alert acknowledged successfully",
            alert
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
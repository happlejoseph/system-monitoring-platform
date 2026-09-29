

import AuditLog from "../models/AuditLog.js";


export const createAuditLog = async(user, action, details)=> {

    try {

        const auditLog = await AuditLog.create({
            user, action, details
        });

        return auditLog;
    }

    catch(error) {
        console.error("Failed to create audit log:", error.message);
        return null;
    }
}



export const getAuditLogs = async(req, res)=> {

    try {

        const logs = await AuditLog.find()
        .populate('user', 'name email role')
        .sort({createdAt: -1});

        res.status(200).json({
            message: 'Audit logs fetched successfully',
            logs
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
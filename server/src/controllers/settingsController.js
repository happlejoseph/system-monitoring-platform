

import Settings from "../models/Settings.js";
import { createAuditLog } from "./auditLogController.js";


export const getSettings = async(req, res)=> {

    try {
        
        let settings = await Settings.findOne();

        if(!settings) {
            settings = await Settings.create({
                dataSource: 'live'
            });
        }

        res.status(200).json({
            message: 'Settings fetched successfully',
            settings
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const updateDataSource = async(req, res)=> {

    try {

        const { dataSource } = req.body;

        if (!["simulated", "live"].includes(dataSource)) {
            return res.status(400).json({
                message: "Invalid data source"
            });
    }

    let settings = await Settings.findOne();
    
    if (!settings) {
            settings = await Settings.create({
                dataSource
            });
        }
        else {
            settings.dataSource = dataSource;
            await settings.save();
        }

        await createAuditLog(
            req.user.id,
            "UPDATE_DATA_SOURCE",
            `Changed data source to: ${dataSource}`
        )

    res.status(200).json({
            message: "Data source updated successfully",
            settings
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

}
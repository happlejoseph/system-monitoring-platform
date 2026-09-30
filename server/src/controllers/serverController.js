

import Server from '../models/Server.js';
import { createAuditLog } from "./auditLogController.js";


export const addServer = async(req, res)=> {

    try {

        const {name, hostname, ipAddress, type, processName, status} = req.body;

        if(!name || !hostname ||!ipAddress) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingServer = await Server.findOne({ipAddress});

        if(existingServer) {
            return res.status(400).json({
                message: 'Server already exist'
            });
        }

        const server = await Server.create({
            name, hostname, ipAddress, type, processName, addedBy: req.user.id
        });

        await createAuditLog(
            req.user.id,
            "ADD_SERVER",
            `Added monitored server: ${server.name}`
        )

        res.status(201).json({
            message: 'Server created successfully',
            server
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export const getServers = async(req, res)=> {

    try {
        
        const servers = await Server.find();

        res.status(201).json({
            message: 'Servers fetches successfully',
            servers
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const getServerById = async(req, res)=> {

    try {

        const {id} = req.params;

        const server = await Server.findById(id);

        if(!server) {
            return res.status(401).json({
                message: 'Server not found'
            });
        }

        res.status(201).json({
            message: 'Server fetched successfully',
            server
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const updateServer = async(req, res)=> {

    try {

        const {id} = req.params;
        const { name, hostname, ipAddress, type, processName, status } = req.body;

        const server = await Server.findByIdAndUpdate(
            id,
            {
                name, hostname, ipAddress, type, processName, status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if(!server) {
            return res.status(404).json({
                message: 'Server not found'
            });
        }

        await createAuditLog(
            req.user.id,
            "UPDATE_SERVER",
            `Updated monitored server: ${server.name}`
        );


        res.status(200).json({
            message: 'Server updated successfully',
            server
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const removeServer = async(req, res)=> {

    try {
        
        const {id} = req.params;

        const server = await Server.findByIdAndDelete(id);

        if(!server) {
            return res.status(404).json({
                message: 'Server not found'
            });
        }

        await createAuditLog(
            req.user.id,
            "REMOVE_SERVER",
            `Removed monitored server: ${server.name}`
        )

         res.status(200).json({
                message: 'Server removed successfully'
            });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
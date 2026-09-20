

import Server from '../models/Server.js';


export const addServer = async(req, res)=> {

    try {

        const {name, hostname, ipAddress} = req.body;

        if(!name || !hostname ||!ipAdress) {
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
            name, hostname, ipAddress
        });

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


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
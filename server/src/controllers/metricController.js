

import Metric from "../models/Metric.js";
import Server from "../models/Server.js";


export const addMetric = async(req, res)=> {

    try {

        const {server, cpu, memory, disk, temperature, fanspeed} = req.body;

        if(!server || cpu === undefined || memory === undefined || disk === undefined || temperature === undefined || fanspeed === undefined) {
            return res.status(400).json({
                message: 'All metric fields are required'
            });
        }

        const existingServer = await Server.findById(server);

        if(!existingServer) {
            return res.status(404).json({
                message: 'Server not found'
            });
        }

        const metric = await Metric.create({
            server, cpu, memory, disk, temperature, fanSpeed
        });

        res.status(200).json({
            message: 'Metric added successfully',
            metric
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const getMetrics = async(req, res)=> {

    try {

        const metrics = await Metric.find().populate('server');

        res.status(200).json({
            message: 'Metrics fetched successfully',
            metrics
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const getMetricsById = async(req, res)=> {

    try {

        const {id} = req.params;

        const metric = await Metric.findById(id).populate('server');

        if(!metric) {
            return res.status(404).json({
                message: 'Metric not found'
            });
        }

        res.status(200).json({
            message: 'Metric fetched successfully',
            metric
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const updateMetric = async(req, res)=> {

    try {
        
        const {id} = req.params;
        const {cpu, memory, disk, temperature, fanSpeed} = req.body;

        const metric = await Metric.findByIdAndUpdate(
            id,
            {
                cpu, memory, disk, temperature, fanSpeed
            },
            {
                new: true,
                runValidators: true
            }
        ).populate('server');

        if(!metric) {
            return res.status(404).json({
                message: 'Metric not found'
            });
        }

        res.status(200).json({
            message: 'Metric updated successfully',
            metric
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
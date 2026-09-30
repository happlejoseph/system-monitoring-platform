

import Metric from "../models/Metric.js";
import Server from "../models/Server.js";
import { getIO } from "../socket.js";
import { checkAnomaly, createAlert } from "../services/anomalyService.js";
import { detectStatisticalAnomaly } from "../services/statisticalAnomalyService.js";

export const addMetric = async(req, res)=> {

    try {

        const {server, cpu, memory, disk, temperature, fanSpeed} = req.body;

        if(!server || cpu === undefined || memory === undefined || disk === undefined || temperature === undefined || fanSpeed === undefined) {
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

        await Server.findByIdAndUpdate(server, {
            lastSeen: new Date(),
            connectionStatus: "online"
        });

        const metric = await Metric.create({
            server, cpu, memory, disk, temperature, fanSpeed
        });

        const io = getIO();

        const memoryAnomaly = await detectStatisticalAnomaly(server, 'memory');
        const diskAnomaly = await detectStatisticalAnomaly(server, 'disk');
        const temperatureAnomaly = await detectStatisticalAnomaly(server, 'temperature');
        const cpuAnomaly = await detectStatisticalAnomaly(server, 'cpu');

        if(cpuAnomaly) {
            const alert = await createAlert(
                server,
                metric._id,
                'Statistical anomaly detected in CPU usage'
            );

            if(alert) {
                io.emit('newAlert', alert);
            }
        };

        
        if(memoryAnomaly) {
            const alert = await createAlert(
                server,
                metric._id,
                'Statistical anomaly detected in Memory usage'
            );

            if(alert) {
                io.emit('newAlert', alert)
            }
        };


        if(diskAnomaly) {
            const alert = await createAlert(
                server,
                metric._id,
                'Statistical anomaly detected in Disk usage'
            );

            if(alert) {
                io.emit('newAlert', alert)
            }
        }

        if(temperatureAnomaly) {
            const alert = await createAlert(
                server,
                metric._id,
                'Statistical anomaly detected in Temperature usage'
            );

            if(alert) {
                io.emit('newAlert', alert);
            }
        }

        console.log("CPU statistical anomaly:", cpuAnomaly);


        io.emit('newMetric', metric)

        const anomalies = checkAnomaly(metric);


        for(const anomaly of anomalies) {
            const alert = await createAlert(
                server, metric._id, anomaly
            );

            if(alert) {
                io.emit('newAlert', alert);
            }
        }

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



export const removeMetric = async(req, res)=> {

    try {

        const {id} = req.params;

        const metric = await Metric.findByIdAndDelete(id);

        if(!metric) {
            return res.status(400).json({
                message: 'Metric not found'
            });
        }

        res.status(200).json({
            message: 'Metric removed successfully'
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
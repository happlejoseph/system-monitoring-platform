

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';

import connectDB from './src/congig/db.js';
import app from './src/app.js';
import { initializeSocket } from './src/socket.js';
import { startHardwareMonitoring } from './src/services/hardwareService.js';
import { updateServerStatuses } from './src/services/serverStatusService.js';


dotenv.config();

connectDB();

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);

    startHardwareMonitoring();
    
    setInterval(async () => {
        await updateServerStatuses();
    }, 5000);
});
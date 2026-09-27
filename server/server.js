

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';

import connectDB from './src/congig/db.js';
import app from './src/app.js';
import { initializeSocket } from './src/socket.js';


dotenv.config();

connectDB();

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
    
});
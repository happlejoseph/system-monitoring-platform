

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './src/congig/db.js';
import app from './src/app.js';
import { Socket } from 'dgram';


dotenv.config();

connectDB();

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (Socket)=> {
    console.log('A client connected');
    
})

server.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
    
});
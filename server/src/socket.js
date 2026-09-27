

import { Server } from "socket.io";


let io;

export const initializeSocket = (server)=> {
    io = new Server(server);
};

export const getIO = ()=> {
    return io;
}
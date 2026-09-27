

import { Server } from "socket.io";


let io;

export const initializeSocket = (server)=> {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173'
        }
    });

    io.on('connection', (socket)=> {
        console.log('client connected', socket.id);

        socket.on('disconnect', ()=> {
            console.log('client disconnected', socket.id);
            
        });
        
    });
};

export const getIO = ()=> {
    return io;
}
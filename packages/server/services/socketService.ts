"use strict";

import { Server } from "socket.io";

export class SocketService {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server, {
            cors: {
                origin : "*" 
            } 
        });
        
        this.io.on("connection", (socket) => {
            console.log("a user connected");
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });

            // Broadcast message to all clients except the sender
            socket.on("message", (msg: string) => {
                socket.broadcast.emit("message", msg);
            });
        });
    }
}
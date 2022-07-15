export class SocketService {
    static socket: any;
    static server: any;

    public static startSocket(server: any) {
       this.server = server;
       this.socket = require('socket.io')(server, { origins: '*:*' });
       this.socket.on('connection' , () => {
            console.log("Socket connected");
           this.socket.emit('socket-connection', '*--Stablished!--*');
        });
    }

    public static emit = (event: string, data: any) => {
        this.socket.emit(event, data);
    }

}
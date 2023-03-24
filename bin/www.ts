import app from '../app';
import http from 'http';
import dotenv from 'dotenv';
import dataBaseConfig from '../db/config';


dotenv.config();

// create a server 
const server = http.createServer(app);

const port = process.env.PORT;
app.set('port', port);

function onListening() {
    const addr: any = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// connect to database
dataBaseConfig();

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

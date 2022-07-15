import mongoose from "mongoose";
import http from "http";
import { Schema, SchemaOptions } from "mongoose";
import { SocketService } from "./api/services/socket.service";

export const port = process.env.PORT || 3000;
export const uri = process.env.MONGODB_URI || 'mongodb+srv://shuaibkhalid:test1234@cluster0.mundl.mongodb.net/test';
export const jsonWebTokenSecret = process.env.JWT_SECRET || 'c2FsYXJ5IGJhcmhhIGRlaW4gYWIgZ3V6YXJhIG5pIGhvdGEgYmh0IG1laG5nYWkgaHk=';
export const objectId = Schema.Types.ObjectId;
export const schemaOptions: SchemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};


/**
 * To set up Database Connection
 */
export const configureDatabase = () => {
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to database!', uri);
        })
        .catch(error => {
            console.log('Connection failed!:', error);
        });
}

/**
 * Starts the Http serve at given port.
 * @param app Express App
 */
export const startServer = (app: any) => {
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Express server listening on port ${port}`);
    });
    SocketService.startSocket(server);
}


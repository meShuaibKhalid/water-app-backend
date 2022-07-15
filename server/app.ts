import express from "express";
import { SocketService } from "./api/services/socket.service";
import { configureDatabase, startServer } from "./config";
import { routes } from "./routes";
const cors = require("cors");
const app = express();
const cron = require("node-cron");
const uuid = require("uuid");

cron.schedule("*/10 * * * * *", () => {
  SocketService.emit('test-connection', 'Mubashir');
}
);

// body parser 
app.use(express.json());

// enable cors
app.use(cors(
  {
    origin: "*"
  }
));


//configure routes
routes(app);

//configure database
configureDatabase();

//Start Socket and Server
startServer(app);


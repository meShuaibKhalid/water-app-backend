import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
const app = express();
app.use(cors({
    origin:"*"
}));

app.use(express.json());
app.use(urlencoded({ limit: '50mb', extended: false }))

app.use("/api/v1/users", require('./api/user'));
app.use("/api/v1/hydration", require('./api/hydration'));

export default app;

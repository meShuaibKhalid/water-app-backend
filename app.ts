import * as express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use("/api/v1/users", require('./api/user'));
app.use("/api/v1/hydration", require('./api/hydration'));

export default app;

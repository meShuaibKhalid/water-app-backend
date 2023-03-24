import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dataBaseConfig = () => {
    mongoose.connect(process.env.MONGO_URI as string).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("Error: ", error);
    });
}

export default dataBaseConfig;


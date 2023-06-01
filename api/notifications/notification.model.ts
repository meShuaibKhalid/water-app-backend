import { model, Schema } from "mongoose";
import { schemaOptions } from "../../consts/common.const";
import { INotification } from "./notification.interface";

let NotificationSchema: Schema<INotification> = new Schema({
    userId: {type: String,  trim: true},
    message: {type: String, trim: true},
    hour: {type: String, trim: true}   
},
{timestamps: true, ...schemaOptions},
    
)
const Notifications = model<INotification>("Notifications", NotificationSchema);
export default Notifications;


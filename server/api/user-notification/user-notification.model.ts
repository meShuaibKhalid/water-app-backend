import { model, Schema } from "mongoose";
import { IUserNotifications } from "./user-notifications.interface";
import { objectId, schemaOptions } from "../../config";


let UserNotificationsSchema: Schema<IUserNotifications> = new Schema({
    userId: { type: objectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now },
    notificationType: { type: Number, required: true },
    notificationMessage: { type: String, required: true },
},
    schemaOptions
)
const UserNotifications = model("UserNotifications", UserNotificationsSchema);
export default UserNotifications;


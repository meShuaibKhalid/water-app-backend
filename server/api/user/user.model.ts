import { model, Schema } from "mongoose";
import { schemaOptions } from "../../config";
import { IUser } from "./user.interface";

let UserSchema: Schema<IUser> = new Schema({
    deviceId: { type: String, trim: true },
    mainMemberId: { type: String, trim: true, required: false },
    relation: { type: String, trim: true, required: false },
    notificationEnabled: { type: Boolean, required: false },
    personalInfo: {
        name: { type: String, trim: true, required: false },
        age: { type: String, trim: true, required: false },
        height: { type: String, trim: true, required: false },
        weight: { type: Number, trim: true, required: false },
        heightUnit: { type: String, trim: true, required: false },
        weightUnit: { type: String, trim: true, required: false },
        gender: { type: String, trim: true, required: false },
        phone: { type: String, trim: true, required: false },
    },
    schoolTimings: {
        startTime: { type: Date, required: false },
        endTIme: { type: Date, required: false },
    },
    todayGoal: { type: Number, required: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
},
    schemaOptions
)
const User = model<IUser>("user", UserSchema);
export default User;


import { model, Schema } from "mongoose";
import { schemaOptions } from "../../consts/common.const";
import { IUser } from "./user.interface";

let UserSchema: Schema<IUser> = new Schema({
    deviceId: { type: String, trim: true },
    mainMemberId: { type: String, trim: true, required: false },
    relation: { type: String, trim: true, required: false },
    notificationEnabled: { type: Boolean, required: false },
    personalInfo: {
        name: { type: String, trim: true, required: false },
        age: { type: Number, trim: true, required: false },
        height: { 
            feet : { type:Number, trim: true, required:false},
            inches: { type:Number, trim:true, required:false}
         },
        weight: { type: Number, trim: true, required: false },
        weightUnit: { type: String, trim: true, required: false },
        gender: { type: String, trim: true, required: false },
        phone: { type: String, trim: true, required: false },
        sleepTime: { type: String, trim: true, required: false },
        awakeTime: { type: String, trim: true, required: false },
        waterUnit: { type: String, trim: true, required: false }
    },
    schoolTimings: {
        startTime: { type: String, trim: true, required: false },
        endTime: { type: String, trim: true, required: false },
    },
    isSchoolGoing: { type: Boolean, required: false},
    todayGoal: { type: Number, required: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    active : {type: Boolean , required: false, default: true}
},
    schemaOptions
)


UserSchema.virtual('notifications', {
    ref: 'Notifications',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
  });
const User = model<IUser>("user", UserSchema);
export default User;


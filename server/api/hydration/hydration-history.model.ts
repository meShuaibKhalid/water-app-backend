import { model, Schema } from "mongoose";
import { objectId, schemaOptions } from "../../config";
import { IHydrationHistory } from "./hydration-history.interface";
 
let HydrationHistorySchema: Schema<IHydrationHistory> = new Schema({
    userId: { type: objectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now },
    todayGoal: { type: Number, required: true },
    goalReached: { type: Number, required: false },
    waterUnit: { type: String, required: false, default: 'ml' },
    hour: { type: Number, required: true },
    time: { type: String, required: true },
    drunk: { type: Number, required: true },
},
    schemaOptions
)
const HydrationHistory = model("HydrationHistory", HydrationHistorySchema);
export default HydrationHistory;


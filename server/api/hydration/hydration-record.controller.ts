import { IHydrationHistory } from "./hydration-history.interface";
import HydrationHistory from "./hydration-history.model";
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;

/**
 * Adds a new hydration record to the database.
 * @param req Request
 * @param res Response
 */
export const addHydrationRecord = async (req: any, res: any) => {
    console.log('req: ', req.body);
    try {
        const hydrationRecord: IHydrationHistory = req.body;
        const savedHydrationRecord = await HydrationHistory.create(hydrationRecord);
        !savedHydrationRecord ?
            res.status(204).json({
                status: 'success',
                message: 'No Content Found'
            }) :
            res.status(201).json({
                status: 'success',
                message: 'Hydration Record Updated Successfully',
                data: savedHydrationRecord
            });
    } catch (error: any) {
        console.log("Error Creating New Hydration Record", error);
        throw new Error("Error Creating New Hydration Record");
    }
};

/**
 * Get Todays Hydration Record By User Id
 * @param req Request
 * @param res Response
 */
export const getTodayHydrationRecordById = async (req: any, res: any) => {
    let goalReached = 0;
    try {

        if (req.params.id === undefined || req.params.id === null) {
            res.status(400).json({
                status: 'failed',
                message: 'User Id is required'
            })
        }
        else {
            const hydrationHistory: IHydrationHistory[] = await HydrationHistory.find({
                $and: [
                    { "userId": new ObjectId(`${req.params.id}`) },
                    {
                        "createdDate": {
                            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                            $lte: new Date(new Date().setHours(23, 59, 59, 999))
                        }
                    }
                ]
            });

            !hydrationHistory.length ?
                res.status(204).json({
                    status: 'success',
                    message: 'No Content Found'
                }) :
                hydrationHistory.forEach((history: IHydrationHistory) => {
                    goalReached = goalReached + history.drunk;
                    return history;
                });

            res.status(200).json({
                status: 'success',
                message: 'Fecthed Record Successfully',
                data: { hydrationHistory, goalReached }
            });
        }

    }
    catch (error: any) {
        console.log("Error Getting Hydration Record", error);
        throw new Error("Error Getting Hydration Record");
    }
};


/**
 * Get All Hydration Records By User Id
 * @param req Request
 * @param res Response
 */
export const getHydrationRecords = async (req: any, res: any) => {
    let goalReached = 0;
    try {
        const hydrationHistory: IHydrationHistory[] = await HydrationHistory.find({
            "userId": new ObjectId(`${req.params.id}`)
        });
        !hydrationHistory.length ?
            res.status(204).json({
                status: 'success',
                message: 'No Content Found'
            }) :
            hydrationHistory.forEach((history: IHydrationHistory) => {
                goalReached = 0;
                goalReached = goalReached + history.drunk;
                return history.goalReached = goalReached;
            });

        res.status(200).json({
            status: 'success',
            message: 'Fecthed Record Successfully',
            data: hydrationHistory
        });
    }
    catch (error: any) {
        console.log("Error Getting Hydration Record", error);
        throw new Error("Error Getting Hydration Record");
    }
}

/**
 * Get the Hydration Record by given Day
 * @param req Request
 * @param res Response
 */
export const getHydrationRecordByDay = async (req: any, res: any) => {
    let goalReached = 0, goal = 0;
    try {
        if (req.body) {
            const hydrationRecord = await HydrationHistory.find({
                $and: [
                    { "userId": new ObjectId(`${req.body.id}`) },
                    {
                        "createdDate": {
                            $gte: new Date(new Date(req.body.currentDate).setHours(0, 0, 0, 0)),
                            $lte: new Date(new Date(req.body.currentDate).setHours(23, 59, 59, 999))
                        }
                    }
                ]
            })

            if (hydrationRecord.length <= 0) {
                res.status(204).json({
                    status: 'success',
                    message: 'No Content Found'
                })
            }
            else {
                hydrationRecord.forEach((history: IHydrationHistory) => {
                    goalReached = goalReached + history.drunk;
                    goal = history.todayGoal;
                    return history;
                });
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Record Successfully. Use this value for showing percentage',
                    data: { goalReached, goal }
                });
            }
        }
        else {
            res.status(400).json({
                status: 'failed',
                message: 'Required Fields Missing'
            })
        }
    } catch (error) {
        console.log('Error in Fetching Hydration Record: ', error);
        throw new Error(`Error in Fetching Hydration Record: ' ${error}`)
    }
}
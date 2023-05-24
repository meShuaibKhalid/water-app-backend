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

            if (!hydrationHistory.length) {
                res.status(204).json({
                    status: 'success',
                    message: 'No Content Found'
                })
            }else {
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Record Successfully',
                    data: { hydrationHistory, goalReached }
                });
            }
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
                res.status(200).json({
                    status: 'success',
                    message: 'No Content Found'
                })
            }
            else {
                console.log('hydrationRecord: ', hydrationRecord);

                hydrationRecord.forEach((history: IHydrationHistory) => {
                    goalReached = goalReached + history.drunk;
                    goal = history.todayGoal;
                    return history;
                });
                if(goalReached > goal ) {
                    goalReached  = goal;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Daily Record Successfully. Use this value for showing percentage',
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

/**
 * Get the Hydration Record by given Month
 * @param req Request
 * @param res Response
 */
export const getHydrationRecordByMonth = async (req: any, res: any) => {
    let goalReached = 0, goal = 0;
    const currentDate = new Date(req.body.currentDate);
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    try {
        if (req.body) {
            const hydrationRecord = await HydrationHistory.find({
                $and: [
                    { "userId": new ObjectId(`${req.body.id}`) },
                    {
                        "createdDate": {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                ]
            })

            if (hydrationRecord.length <= 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'No Hydration Record Found'
                })
            }
            else {
                console.log()

                hydrationRecord.forEach((history: IHydrationHistory) => {
                    goalReached = goalReached + history.drunk;
                    goal = history.todayGoal;
                    return history;
                });
                if(goalReached > goal ) {
                    goalReached  = goal;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Monthly Record Successfully. Use this value for showing percentage',
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

/**
 * Get the Hydration Record by given Week
 * @param req Request
 * @param res Response
 */
export const getHydrationRecordByWeek = async (req: any, res: any) => {
    let goalReached = 0, goal = 0;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    console.log(startDate, 'startDate')
    console.log(endDate, 'endDate')
    try {
        if (req.body) {
            const hydrationRecord = await HydrationHistory.find({
                $and: [
                    { "userId": new ObjectId(`${req.body.id}`) },
                    {
                        "createdDate": {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                ]
            })

            if (hydrationRecord.length <= 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'No Hydration Record Found'
                })
            }
            else {
                hydrationRecord.forEach((history: IHydrationHistory) => {
                    goalReached = goalReached + history.drunk;
                    goal = history.todayGoal;
                    return history;
                });
                if(goalReached > goal ) {
                    goalReached  = goal;
                }
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Weekly Record Successfully. Use this value for showing percentage',
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

/**
 * Get the Hydration Record by given Month
 * @param req Request
 * @param res Response
 */
export const getHydrationYearlyRecord = async (req: any, res: any) => {
    let janGoal = 0;
    let febGoal = 0;
    let marchGoal = 0;
    let aprilGoal = 0;
    let mayGoal = 0;
    let juneGoal = 0;
    let julyGoal = 0;
    let augustGoal = 0;
    let sepGoal = 0;
    let octGoal = 0;
    let novGoal = 0;
    let decGoal = 0;

    try {
        if (req.body) {
            const hydrationRecord = await HydrationHistory.find({
                $and: [
                    { "userId": new ObjectId(`${req.body.id}`) },
                    {
                        "createdDate": {
                            $gte: req.body.startDate,
                            $lte: req.body.endDate
                        }
                    }
                ]
            })

            if (hydrationRecord.length <= 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'No Hydration Record Found'
                })
            }
            else {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let monthlyHistoryRecord: number[] = [];


                hydrationRecord.forEach(record => {
                    const d = new Date(record.createdDate);
                    switch (months[d.getMonth()]) {
                        case 'January':
                            janGoal = janGoal + record.drunk;
                            break;
                        case 'February':
                            febGoal = febGoal + record.drunk;
                            break;
                        case 'March':
                            marchGoal = marchGoal + record.drunk;
                            break;
                        case 'April':
                            aprilGoal = aprilGoal + record.drunk;
                            break;
                        case 'May':
                            mayGoal = mayGoal + record.drunk;
                            break;
                        case 'June':
                            juneGoal = juneGoal + record.drunk;
                            break;
                        case 'July':
                            julyGoal = julyGoal + record.drunk;
                            break;
                        case 'August':
                            augustGoal = augustGoal + record.drunk;
                            break;
                        case 'September':
                            sepGoal = sepGoal + record.drunk;
                            break;
                        case 'October':
                            octGoal = octGoal + record.drunk;
                            break;
                        case 'November':
                            novGoal = novGoal + record.drunk;
                            break;
                        case 'December':
                            decGoal = decGoal + record.drunk;
                            break;

                        default:
                            break;
                    }

                })
                monthlyHistoryRecord = [janGoal, febGoal, marchGoal, aprilGoal, mayGoal, juneGoal, julyGoal, augustGoal, sepGoal, octGoal, novGoal, decGoal]
                res.status(200).json({
                    status: 'success',
                    message: 'Fecthed Each Month Record Successfully. Use this value to show in highCharts',
                    data: { monthlyHistoryRecord }
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

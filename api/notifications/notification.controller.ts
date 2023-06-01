import moment from "moment";
import { INotification } from "./notification.interface";
import Notifications from "./notification.model";

const Mongoose = require("mongoose");

/**
 * save Notifications 
 * @param req request
 * @param res response
 */
export const addNotification = async (req: any, res: any) => {
    try {
        const notifications: INotification[] = await Notifications.find({ userId: req.body.userId, hour: req.body.hour });
        console.log('notifications: ', notifications);
        if (notifications.length) {
            res.status(204).json({
                status: '',
                message: ''
            })
        } else {
            const notificationRecord: INotification = req.body;
            console.log('notificationRecord: ', notificationRecord);
            const savedNotificationRecord = await Notifications.create(notificationRecord);
            console.log('savedNotificationRecord: ', savedNotificationRecord);
            !savedNotificationRecord ?
                res.status(204).json({
                    status: 'success',
                    message: 'No Content Found'
                }) :
                res.status(201).json({
                    status: 'success',
                    message: 'Saved Notifications Successfully',
                    data: savedNotificationRecord
                });
        }
    } catch (error: any) {
        console.log("Error saving notifications", error);
        throw new Error("Error saving notifications");
    }
}

/**
 * save Notifications 
 * @param req request
 * @param res response
 */
export const deleteNotification = async (req: any, res: any) => {
    try {
    
            const deletedRecord = await Notifications.deleteOne({ userId: req.body.userId, hour:  req.body.hour });
            console.log('deletedRecord: ', deletedRecord);
            !deletedRecord ?
                res.status(204).json({
                    status: 'success',
                    message: 'No Content Found'
                }) :
                res.status(201).json({
                    status: 'success',
                    message: 'Notifications deleted  Successfully',
                    data: deletedRecord
                });
        
    } catch (error: any) {
        console.log("Error deleting notifications", error);
        throw new Error("Error deleting notifications");
    }
}



/**
 * get notifiactions
 * @param req Request
 * @param res Response
 * @returns notification
 */
export const getNotification = async (req: any, res: any) => {
    console.log("get User id", req.params.id)


}


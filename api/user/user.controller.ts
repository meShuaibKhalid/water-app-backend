import { IUser } from './user.interface';
import * as qrCode from 'qrcode';
import User from './user.model';
import moment from 'moment';
import { INotification } from '../notifications/notification.interface';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;


/**
 * creates user
 * @param req request
 * @param res response
 */
export const createUser = async (req: any, res: any) => {
    console.log('req:Create ', req.body);
    try {
        const user: IUser = req.body;
        //Update if user have existing account
        const updatedUser = await User.findOneAndUpdate(
            { "deviceId": user?.deviceId }, user, { new: true }
        )
        if (updatedUser && !user.mainMemberId) {
            return res.status(200).json({
                status: 'success',
                message: 'User Updated Successfully',
                data: updatedUser
            });
        }
        else {
            if (user.mainMemberId) {
                const newFamilyMember = await User.create(user);
                return res.status(200).json({
                    status: 'success',
                    message: 'Added Family Member successfully',
                    data: newFamilyMember
                });
            }
            else {
                const newUser = new User(user);
                const savedUser = await newUser.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'User created successfully',
                    data: savedUser
                });
            }
        }
    } catch (error: any) {
        console.log("Error Creating New User", error);
        throw new Error("Error Creating New User");
    }
}

export const getPreviousProfile = async (req: any, res: any) => {
    try {
        const user: any = await User.findOne({ "deviceId": req.params.id });
        return res.status(200).json({
            status: 'success',
            message: 'Get Previous Profile Successfully',
            data: user
        });
    } catch (e: any) {
        console.log("error", e);
        throw new Error("Error in Fetching User");
    }
}

/**
 * Gets user by id
 * @param req Request
 * @param res Response
 * @returns users
 */
export const getUserById = async (req: any, res: any) => {
    const currentTime = moment();
    const currentDate = moment().format('YYYY-MM-DD');
    const userObject: any = {
        mainMember: {},
        familyMembers: []
    };
    try {

        if (!req.params.id) {
            return res.status(400).json({
                status: 'fail',
                message: 'user Id is missing',
            });
        }

        const users: any = await User.find({
            $or: [
                { "_id": new ObjectId(req.params.id) },
                { "mainMemberId": new ObjectId(req.params.id) }
            ],
            active: true
        },
        ).populate('notifications')



        if (!users.length) {
            return res.status(404).json({
                status: 'Invalid ID',
                message: 'Data not found',
                data: users
            })
        }
        else {
            users.forEach((user: any) => {
                if (!user.mainMemberId) {
                    userObject.mainMember = user
                } else {
                    let filteredNotifications: INotification[] = []
                    // Filter the notifications for the current date 
                    user.notifications.forEach((notification: INotification) => {
                        if (moment(notification.createdAt).format('YYYY-MM-DD') == currentDate) {
                            const desiredTime = moment(notification.hour, "h:mm A");
                            if (desiredTime.isSameOrBefore(currentTime)) {
                                console.log('checke truee')
                                filteredNotifications.push(notification)
                            } else {
                                filteredNotifications = []
                            }
                        }
                    });
                    user.notifications = filteredNotifications;
                    userObject.familyMembers.push(user)
                }
            })
            return res.status(200).json({
                status: 'success',
                message: 'Fetched user successfully',
                data: userObject
            });
        }
    }
    catch (error) {
        console.log("Error in Fetching User", error);
        throw new Error("Error in Fetching User");
    }
}


/**
 * Updates User
 * @param req request
 * @param res resposne
 * @returns 
 */
export const updateUser = async (req: any, res: any) => {
    console.log('req:upudate ', req.body);
    try {
        const user = await User.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, req.body);

        return res.status(200).json({
            status: 'success',
            message: 'Updated user successfully',
            data: user
        });
    }
    catch (error) {
        console.log("Error in Updating User", error);
        throw new Error("Error in Updating User");
    }
}

/**
 * Updates family Member Record
 * @param req request
 * @param res resposne
 * @returns 
 */
export const updateFamilyMember = async (req: any, res: any) => {
    console.log('req: updateFamilyMember ', req);
    try {
        const user = await User.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, req.body);
        return res.status(200).json({
            status: 'success',
            message: 'Updated member successfully',
            data: user
        });
    }
    catch (error) {
        console.log("Error in Updating User", error);
        throw new Error("Error in Updating User");
    }
}

/**
 * Gets QR code for family member Sign in
 * @param req request
 * @param res response
 * @returns 
 */
export const getUserQR = async (req: any, res: any) => {
    try {
        const user: any = await User.findById(new ObjectId(`${req.params.id}`));
        if (user) {
            const qrCodeUrl = await qrCode.toDataURL(`${JSON.stringify(user)}`);
            return res.status(200).json({
                status: 'success',
                message: 'Fetched user QR successfully',
                data: qrCodeUrl
            });
        }

    } catch (error) {
        console.log("Error in Generating QR code", error);
        throw new Error("Error in Generating QR code");
    }
}

export const removeFamilyMemberAcc = async (req: any, res: any) => {
    try {
        const user: any = await User.findByIdAndDelete(new ObjectId(`${req.params.id}`));
        console.log('user: ', user);
        if (user) {
            return res.status(200).json({
                status: 'success',
                message: 'Deleted Family Member successfully',
            });
        }

    } catch (error) {
        console.log("Error in Deleting Family Member ", error);
        throw new Error("Error in Deleting Family Member");
    }
}

export const deleteUserAccount = async (req: any, res: any) => {
    try {
        const user: any = await User.deleteOne({ deviceId: req.params.id });
        if (user) {
            return res.status(200).json({
                status: 'success',
                message: 'Deleted user successfully',
            });
        }
    } catch (error) {
        console.log("Error in Deleting user", error);
        throw new Error("Error in Deleting user");
    }
}

/**
 * De-Active User object
 * @param req request
 * @param res response
 * @returns 
 */
export const deactivateUser = async (req: any, res: any) => {
    try {

        const users: any = await User.find({
            $or: [
                { "_id": new ObjectId(req.params.id) },
                { "mainMemberId": new ObjectId(req.params.id) }
            ]
        }
        ).populate('notifications')
        const userIDs = users.map((user: any) => user._id);

        await User.updateMany({
            $or: [
                { "_id": { $in: userIDs } },
                { "mainMemberId": { $in: userIDs } }
            ]
        },
            { active: false }
        );

        if (users) {
            res.status(200).json({ message: "users deactivated" });
            return;
        }

    } catch (error) {
        console.log('error: ', error);
        res.status(500).json(error);
    }
}

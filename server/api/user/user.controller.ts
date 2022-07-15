import { SocketService } from '../services/socket.service';
import { IUser } from './user.interface';
import * as qrCode from 'qrcode';
import User from './user.model';
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const io = require("socket.io");


/**
 * creates user
 * @param req request
 * @param res response
 */
export const createUser = async (req: any, res: any) => {
    console.log('req: ', req.body);
    try {
        const user: IUser = req.body;

        //check if user already exists
        const userAlreadyExist = await User.findOne(
            { "deviceId": user?.deviceId }
        );

        if (userAlreadyExist && !user.mainMemberId) {
            return res.status(200).json({
                status: 'success',
                message: 'User Already Exists',
                data: userAlreadyExist
            });
        }
        else {
            if (user.mainMemberId) {
                const newFamilyMember = await User.create(user);
                return res.status(201).json({
                    status: 'success',
                    message: 'Added Family Member successfully',
                    data: newFamilyMember
                });
            }
            else {
                const newUser = new User(user);
                const savedUser = await newUser.save();
                return res.status(201).json({
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

/**
 * Gets user by id
 * @param req Request
 * @param res Response
 * @returns users
 */
export const getUserById = async (req: any, res: any) => {
    console.log(req.params.id)
    const userObject: any = {
        mainMember: {},
        familyMembers: []
    };
    try {
        const users: any = await User.find({
            $or: [
                { "_id": new ObjectId(req.params.id) },
                { "mainMemberId": new ObjectId(req.params.id) }
            ]
        }
        );

        users.forEach((user: IUser) => !user.mainMemberId ? userObject.mainMember = user : userObject.familyMembers.push(user));
        return res.status(200).json({
            status: 'success',
            message: 'Fetched user successfully',
            data: userObject
        });
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


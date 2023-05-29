import express from 'express';
import * as UserController from '../user/user.controller'; // User Controller

const router = express.Router();

//User Endpoints
router.post("/createUser/", UserController.createUser);
router.get("/:id/getUserByID", UserController.getUserById);
router.put("/:id/updateUser", UserController.updateUser);
router.put("/:id/updateFamilyMember", UserController.updateFamilyMember);
router.get("/qr/:id", UserController.getUserQR);
router.delete("/familyMember/:id",UserController.removeFamilyMemberAcc)
module.exports = router;

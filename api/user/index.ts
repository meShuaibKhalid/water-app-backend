import express from 'express';
import * as UserController from '../user/user.controller'; // User Controller

const router = express.Router();

//User Endpoints
router.post("/createUser/", UserController.createUser);
router.get("/:id/getUserByID", UserController.getUserById);
router.put("/:id/updateUser", UserController.updateUser);
router.put("/:id/updateFamilyMember", UserController.updateFamilyMember);
router.get("/qr/:id", UserController.getUserQR);
router.delete("/:id/familyMemberRemove",UserController.removeFamilyMemberAcc);
router.delete("/:id/deleteUser",UserController.deleteUserAccount);
router.delete("/:id/deactivate",UserController.deactivateUser);
module.exports = router;

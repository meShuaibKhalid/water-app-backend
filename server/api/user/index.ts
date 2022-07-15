import express from 'express';
import * as UserController from '../user/user.controller'; // User Controller

const router = express.Router();

//User Endpoints
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.get("/qr/:id", UserController.getUserQR);

module.exports = router;

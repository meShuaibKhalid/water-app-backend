import express from 'express';
import * as notifications from './notification.controller'; // Notification Controller

const router = express.Router();

//notifications Endpoints
router.post("/saveNotification/", notifications.addNotification);
router.get("/:id/getUserByID", notifications.getNotification);
module.exports = router;

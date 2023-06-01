import express from 'express';
import * as notifications from './notification.controller'; // Notification Controller

const router = express.Router();

//notifications Endpoints
router.post("/saveNotification/", notifications.addNotification);
router.post("/deleteNotification/", notifications.deleteNotification);
module.exports = router;

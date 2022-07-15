import express from 'express';
import * as HydrationController from './hydration-record.controller'; // Hydration History Controller
const router = express.Router();

//Hydration Endpoints
router.post("/add", HydrationController.addHydrationRecord);
router.get("/:id", HydrationController.getTodayHydrationRecordById);
router.post("/record", HydrationController.getHydrationRecordByDay);

module.exports = router;


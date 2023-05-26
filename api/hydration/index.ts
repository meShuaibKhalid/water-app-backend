import express from 'express';
import * as HydrationController from './hydration-record.controller'; // Hydration History Controller
const router = express.Router();

//Hydration Endpoints
router.post("/add", HydrationController.addHydrationRecord);
router.get("/:id/dailyHydration", HydrationController.getTodayHydrationRecordById);
router.post("/recordByDay", HydrationController.getHydrationRecordByDay);
router.post("/recordbyMonth", HydrationController.getHydrationRecordByMonth);
router.post("/recordByWeek", HydrationController.getHydrationRecordByWeek);
router.post("/yearlyRecord", HydrationController.getHydrationYearlyRecord);
module.exports = router;


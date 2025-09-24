import express from "express"
import { bookingform } from "../controllers/bookingController.js";
import { verifyjwt } from "../middleware/auth.middelware.js";

const router = express.Router();

router.post('/booking',verifyjwt, bookingform)

export default router;
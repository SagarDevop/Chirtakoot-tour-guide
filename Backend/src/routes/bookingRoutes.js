import express from "express"
import { bookingform } from "../controllers/bookingController";
import { verifyjwt } from "../middleware/auth.middelware";

const router = express.Router();

router.post('/booking',verifyjwt, bookingform)

export default router;
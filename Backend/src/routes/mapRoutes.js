import { geocode, direction } from "../controllers/map.controller.js";
import express from 'express'

const router = express.Router();

router.post('/geocode', geocode);
router.post('/direction', direction);


export default router;

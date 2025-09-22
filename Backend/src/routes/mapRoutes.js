import { geocode, direction } from "../controllers/map.controller.js";
import express from 'express'

const router = express.Router();

router.get('/geocode', geocode);
router.get('/direction', direction);


export default router;

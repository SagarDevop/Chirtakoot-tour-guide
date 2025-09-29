import express from 'express'
import { addhotel, gethotels } from '../controllers/hotelController.js';

const router = express.Router()

router.post('/addhotel', addhotel)
router.get('/gethotel', gethotels)

export default router;
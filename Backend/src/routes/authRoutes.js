import express from 'express';
import { signin, login, logout, refreshAccessToken } from '../controllers/authController.js';
import { verifyjwt } from '../middleware/auth.middelware.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/login', login);
router.post('/logout', logout)
router.post("/refresh", refreshAccessToken);

export default router;

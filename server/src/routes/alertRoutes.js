

import express, { Router } from 'express';
import { auth } from '../middleware/authMiddleware.js'
import { getAlerts } from '../controllers/alertControllers.js';


const router = express.Router();


router.get('/', auth, getAlerts);

export default router;


import express, { Router } from 'express';
import { auth } from '../middleware/authMiddleware.js'
import { acknowledgeAlert, getAlerts } from '../controllers/alertControllers.js';


const router = express.Router();


router.get('/', auth, getAlerts);

router.put('/:id/acknowledge', auth, acknowledgeAlert);

export default router;
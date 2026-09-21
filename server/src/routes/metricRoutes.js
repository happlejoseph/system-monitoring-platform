

import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { addMetric } from '../controllers/metricController.js';


const router = express.Router();


router.post('/', auth, addMetric);


export default router;
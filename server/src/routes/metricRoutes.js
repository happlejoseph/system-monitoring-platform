

import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { addMetric, getMetrics, getMetricsById, updateMetric } from '../controllers/metricController.js';


const router = express.Router();


router.post('/', auth, addMetric);

router.get('/', auth, getMetrics);

router.get('/:id', auth, getMetricsById);

router.post('/:id', auth, updateMetric);


export default router;
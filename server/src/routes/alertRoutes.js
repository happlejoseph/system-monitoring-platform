

import express from 'express';
import { auth} from '../middleware/authMiddleware.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { acknowledgeAlert, getAlerts } from '../controllers/alertControllers.js';


const router = express.Router();


router.get('/', auth, getAlerts);

router.put('/:id/acknowledge', auth, allowRoles('admin', 'operator'), acknowledgeAlert);

export default router;
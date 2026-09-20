

import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { allowRoles } from '../middleware/roleMiddleware';
import { addServer } from '../controllers/serverController';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addServer);

export default router;
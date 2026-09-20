

import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { allowRoles } from '../middleware/roleMiddleware';
import { addServer, getServerById, getServers } from '../controllers/serverController';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addServer);

router.get('/', auth, allowRoles('admin'), getServers);

router.get('/:id', auth, allowRoles('admin'), getServerById);

export default router;
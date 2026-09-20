

import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { allowRoles } from '../middleware/roleMiddleware';
import { addServer, getServerById, getServers, removeServer, updateServer } from '../controllers/serverController';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addServer);

router.get('/', auth, allowRoles('admin'), getServers);

router.get('/:id', auth, allowRoles('admin'), getServerById);

router.put('/:id', auth, allowRoles('admin'), updateServer);

router.delete('/:id', auth, allowRoles('admin'), removeServer);

export default router;
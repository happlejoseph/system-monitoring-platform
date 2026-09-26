

import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';
import { addServer, getServerById, getServers, removeServer, updateServer } from '../controllers/serverController.js';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addServer);

router.get('/', auth, allowRoles('admin'), getServers);

router.get('/:id', auth, allowRoles('admin'), getServerById);

router.put('/:id', auth, allowRoles('admin'), updateServer);

router.delete('/:id', auth, allowRoles('admin'), removeServer);

export default router;
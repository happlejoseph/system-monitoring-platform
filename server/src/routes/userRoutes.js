

import express from 'express';
import { auth } from '../middleware/authMiddleware';
import { allowRoles } from '../middleware/roleMiddleware';
import { addUser } from '../controllers/userController';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addUser);

export default router;
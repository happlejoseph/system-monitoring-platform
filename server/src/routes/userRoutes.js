

import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';
import { addUser, getUserById, getUsers, removeUser, updateUser } from '../controllers/userController.js';


const router = express.Router();

router.post('/', auth, allowRoles('admin'), addUser);

router.get('/', auth, allowRoles('admin'), getUsers);

router.get('/:id', auth, allowRoles('admin'), getUserById);

router.put('/:id', auth, allowRoles('admin'), updateUser);

router.delete('/:id', auth, allowRoles('admin'), removeUser);


export default router;
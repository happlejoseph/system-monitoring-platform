

import express from "express";
import { getSettings, updateDataSource } from "../controllers/settingsController.js";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();


router.get('/', auth, getSettings);

router.put('/data-source', auth, allowRoles('admin'), updateDataSource);


export default router;
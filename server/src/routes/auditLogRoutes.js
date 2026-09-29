

import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { getAuditLogs } from "../controllers/auditLogController.js";

const router = express.Router();

router.get("/",auth,allowRoles("admin"),getAuditLogs);

export default router;
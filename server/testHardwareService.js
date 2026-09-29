

import dotenv from "dotenv";
dotenv.config();

import { sendHardwareMetrics } from "./src/services/hardwareService.js";

const testService = async () => {
    await sendHardwareMetrics();
};

testService();
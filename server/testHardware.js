

import { getHardwareMetrics } from "./src/monitoring/hardwareMonitor.js";

const testHardware = async () => {
    try {
        const metrics = await getHardwareMetrics();

        console.log("Real Hardware Metrics");
        console.log("---------------------");
        console.log(metrics);
    } catch (error) {
        console.error("Hardware test failed:", error.message);
    }
};

testHardware();
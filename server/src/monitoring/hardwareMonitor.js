

import si from "systeminformation";

export const getHardwareMetrics = async () => {
    try {
        const [cpu, memory, disks, temperature] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.cpuTemperature()
        ]);

        const rootDisk = disks.find((disk)=> disk.mount === "/");

        return {
            cpu: Number(cpu.currentLoad.toFixed(2)),

            memory: Number(((memory.used / memory.total) * 100).toFixed(2)),

            disk: rootDisk ? Number(rootDisk.use.toFixed(2)): 0,

            temperature: temperature.main || 0, fanSpeed: 0
        };

    }
    
    catch (error) {
        console.error("Failed to read hardware metrics:", error.message);
        throw error;
    }
};
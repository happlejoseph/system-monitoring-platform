

export const getSimulatedMetrics = () => {
    return {
        cpu: Number((85 + Math.random() * 15).toFixed(2)),
        memory: Number((80 + Math.random() * 20).toFixed(2)),
        disk: Number((70 + Math.random() * 30).toFixed(2)),
        temperature: Number((80 + Math.random() * 20).toFixed(2)),
        fanSpeed: Math.floor(1000 + Math.random() * 2000)
    };
};
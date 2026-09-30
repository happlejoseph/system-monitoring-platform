

import Metric from "../models/Metric.js";


export const detectStatisticalAnomaly = async (serverId, field) => {

    const recentMetrics = await Metric.find({
        server: serverId
    })
        .sort({ timestamp: -1 })
        .limit(10);

    const values = recentMetrics
        .map((metric) => metric[field])
        .reverse();

    if (values.length < 5) {
        return false;
    }

    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

    const variance = values.reduce((sum, value) => {
            return sum + Math.pow(value - mean, 2);
        }, 0) / values.length;

    const standardDeviation = Math.sqrt(variance);

    const latestValue = values[values.length - 1];

    if (standardDeviation === 0) {
        return false;
    }

    const zScore = Math.abs((latestValue - mean) / standardDeviation);

    return zScore > 2;
};
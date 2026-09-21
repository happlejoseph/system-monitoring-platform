

export const checkAnomaly = (metric)=> {

    const anomalies = [];

    if(metric.cpu > 90) {
        anomalies.push('High cpu usage');
    }

    if(metric.memory > 90) {
        anomalies.push('High memory usage');
    }

    if(metric.disk > 90) {
        anomalies.push('High disk usage');
    }

    if(metric.temperature > 90) {
        anomalies.push('High temperature');
    }

    return anomalies;
};
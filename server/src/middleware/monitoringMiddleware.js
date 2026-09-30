

export const monitoringAuth = (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Monitoring authentication required"
        });
    }

    if (token !== process.env.MONITORING_TOKEN) {
        return res.status(403).json({
            message: "Invalid monitoring token"
        });
    }

    next();
};
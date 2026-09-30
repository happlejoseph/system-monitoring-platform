

import Server from "../models/Server.js";


export const updateServerStatuses = async()=> {

    try {

        const timeout = 15000;

        const cutoffTime = new Date(Date.now() - timeout);

        await Server.updateMany(
            {
                connectionStatus: "online",
                lastSeen: { $lt: cutoffTime }
            },
            {
                connectionStatus: "offline"
            }
        )
    }

    catch(error) {
        console.error("Failed to update server statuses:",error.message);
    }
}


import mongoose from "mongoose";


const settingsSchema = new mongoose.Schema({

    dataSource: {
        type: String,
        enum: ["simulated", "live"],
        default: 'live'
    }
}, {timestamps: true});


const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
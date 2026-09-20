

import mongoose from "mongoose";


const serverSchema = new mongoose.Schema({

    name: {
        type: String,
        requied: true,
        trim: true

    },

    hostname: {
        type: String,
        requied: true,
        trim: true
    },

    ipAddress: {
        type: String,
        requied: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }

}, {timestamps: true})


const Server = mongoose.model('Server', serverSchema);

export default Server;
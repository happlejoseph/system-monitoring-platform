

import mongoose from "mongoose";


const MetricSchema = new mongoose.Schema({
    
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },

    cpu: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    memory: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    disk: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    temperature: {
        type: Number,
        required: true
    },

    fanSpeed: {
        type: Number,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

const Metric = mongoose.model('Metric', MetricSchema);

export default Metric;
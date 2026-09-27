

import mongoose from 'mongoose';


const alertSchema = new mongoose.Schema({

    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },

    metric: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Metric',
        required: true
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },

    status: {
        type: String,
        enum: ['active', 'acknowledged'],
        default: 'active'
    },


    }, {timestamps: true});

const Alert = mongoose.model('Alert', alertSchema);


export default Alert;
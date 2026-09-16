

import mongoose, { Types } from 'mongoose';

const userSchema = new moongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    pasaword: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        trpe: String,
        enum: ['admin', 'operator', 'viewer'],
        default: 'viewer'
    }

}, {timestamps: true});

const User = moongoose.model('User', userSchema)

export default User;
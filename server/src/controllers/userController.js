

import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const addUser = async(req, res)=> {

    try {

        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                message: 'User is already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashPassword, role
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const getUsers = async(req, res)=> {

    try {

        const users = await User.find().select('-password');

        res.status(200).json({
            message: 'User fetched successfully',
            users
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const getUserById = async(req, res)=> {

    try {

        const {id} = req.params;

        const user = await User.findById(id).select('-password');

        if(!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Profile data',
            user
        })
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}



export const updateUser = async(req, res)=> {

    try {

        const {id} = req.params;

        const {name, email, role, status} = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            {
                name, email, role, status,
            },
            {
                new: true
            }
        ).select('-password');

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Update user successfully',
            user
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}



export const removeUser = async(req, res)=> {

    try {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User remove successfully'
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
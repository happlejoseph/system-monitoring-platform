

import User from "../models/User.js";
import bcrypt from 'bcryptjs'




export const register = async(req, res)=> {

    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: 'All field required'
            });
        }

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exist'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password:hashPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            user
        });
    }

    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}
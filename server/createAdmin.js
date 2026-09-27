

import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './src/models/User.js';


dotenv.config();

const createAdmin = async(req, res)=> {

    try {

        await mongoose.connect(process.env.MONGO_URL);

        const existingAdmin = await User.findOne({
            email: 'admin@gmail.com'
        });

        if(existingAdmin) {
            console.log('Admin already exist');
            process.exit();
            
        }

        const hashPassword = await bcrypt.hash('admin@123', 10);

        await User.create({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashPassword,
            role: 'admin'
        });

        console.log('Admin created successfully');
        process.exit();
        
    }

    catch(error) {
            console.log(error.message)
            process.exit(1)
    }
}

createAdmin();


import express from "express";
import connectDB from './src/congig/db.js';
import app from './src/app.js';

connectDB();

const PORT = process.env.PORT || 3001

app.get('/api/test', (req, res)=> {
    res.json({
        message: 'monitoring api is working'
    });
});

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
    
});
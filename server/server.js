

import express from "express";
import connectDB from './src/congig/db.js'

connectDB();

const app = express();

const PORT = 3001;

app.get('/api/test', (req, res)=> {
    res.json({
        message: 'monitoring api is working'
    });
});

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
    
});
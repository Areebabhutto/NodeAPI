const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succefully....on PORT ${PORT}`);
});
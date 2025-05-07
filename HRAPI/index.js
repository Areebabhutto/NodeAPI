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
        const result = await pool.query('select e.employee_id, e.first_name, e.last_name, j.job_title, d.department_name, l.location_id, l.city from employees e join jobs j on e.job_id = j.job_id join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id');
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
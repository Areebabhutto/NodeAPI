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

app.get('/department',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT 
    e.employee_id, 
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
    e.salary 
  FROM employees e 
  WHERE e.salary > (
    SELECT AVG(salary) 
    FROM employees 
    WHERE department_id = e.department_id) 
  AND e.department_id IN (
    SELECT DISTINCT department_id 
    FROM employees 
    WHERE first_name LIKE '%J%')
`);
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
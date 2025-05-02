const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connnectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

module.exports=pool;
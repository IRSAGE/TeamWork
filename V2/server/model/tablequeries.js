import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY UNIQUE,
    first-name VARCHAR NOT NULL,
    last-name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    jobrole VARCHAR NOT NULL,
    department VARCHAR NOT NULL,
    address VARCHAR NOT NULL
    
);
INSERT INTO users (
    first-name, last-name, email, password, gender,jobrole,department,address) 
    VALUES (
       'Iragena',
       'Egide',
       'user1@gmail.com',
       'iragenaegide',
        'male',
        'IT',
        'software engineer',
        'kabuga'
);
`);

export default createTables;

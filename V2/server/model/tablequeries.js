import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  process.stdout.write(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY UNIQUE,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    jobrole VARCHAR NOT NULL,
    department VARCHAR NOT NULL,
    address VARCHAR NOT NULL
    
);
INSERT INTO users (
    first_name, last_name, email, password, gender,jobrole,department,address) 
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

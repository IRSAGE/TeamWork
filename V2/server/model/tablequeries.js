import pool from '../helpers/dbpool';

pool.on('error', (err) => {
  process.stdout.write(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users,articles CASCADE;
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
CREATE TABLE articles(
  id SERIAL PRIMARY KEY UNIQUE,
  title VARCHAR NOT NULL,
  article VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  author_id VARCHAR NOT NULL,
  createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

export default createTables;

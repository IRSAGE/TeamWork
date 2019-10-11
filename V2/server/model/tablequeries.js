import pool from '../helpers/dbpool';

pool.on('error', (err) => {
  process.stdout.write(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users,articles,comments CASCADE;
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
CREATE TABLE articles(
  id SERIAL PRIMARY KEY UNIQUE,
  title VARCHAR NOT NULL,
  article VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  author_id VARCHAR NOT NULL,
  createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments(
  id SERIAL PRIMARY KEY UNIQUE,
  articleid INTEGER NOT NULL,
  comment VARCHAR NOT NULL,
  author_id VARCHAR NOT NULL
  
);
`);

export default createTables;

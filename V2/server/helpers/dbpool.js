import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.DATABASE_TEST });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

pool.on('error', (err) => {
  process.stdout.write(err);
});

export default pool;

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
class Model {
  constructor(table) {
    this.table = table;

    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.pool.on('connect', () => {
      process.stdout.write('connected to the db');
    });
    this.pool.on('error', (err) => {
      process.stdout.write('db-error: ', err);
    });
  }

  async insert(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  select = async (columns, clause, values) => {
    try {
      let query;
      if (clause) {
        query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
      } else {
        query = `SELECT ${columns} FROM ${this.table}`;
      }
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }
}
export default Model;

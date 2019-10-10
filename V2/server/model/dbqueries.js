import pool from '../helpers/dbpool';

let query;
class Model {
  constructor(table) {
    this.table = table;

    this.pool = pool;
    this.pool.on('error', (err) => {
      process.stdout.write('db-error: ', err);
    });
  }

  async insert(columns, selector, values) {
    query = `INSERT INTO ${this.table} (${columns}) VALUES (${selector}) returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  select = async (columns, clause, values) => {
    try {
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

  async update(columns, clause, values) {
    query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(clause, values) {
    query = `DELETE FROM ${this.table} WHERE ${clause} returning *`;
    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}
export default Model;

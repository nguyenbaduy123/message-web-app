const query = require("../db/database");
const bcrypt = require("bcryptjs");
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

class UserModel {
  constructor(user) {
    this.id = user.id || null;
    this.username = user.username || null;
    this.email = user.email || null;
    this.fullname = user.fullname || null;
    this.password = user.password || null;
    this.image_url = user.image_url || null;
    this.role_id = 2;
    this.created_at = user.created_at || null;
    this.refreshToken = user.refreshToken || null;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const result = await query("INSERT INTO users (username, email, fullname, password, image_url, role_id) VALUES (?, ?, ?, ?, ?, ?)", [
      this.username,
      this.email,
      this.fullname,
      hashedPassword,
      this.image_url,
      this.role_id,
    ]);

    const insertedId = result[0].insertId;
    const insertedUser = await query('SELECT * FROM users WHERE id = ?', [insertedId]);

    return insertedUser[0];
  }

  static async findAll() {
    const sql = "SELECT * FROM users";
    const params = [];

    const rows = await query(sql, params);

    return rows[0];
  }

  static login = async (email, password) => {
    const user = await db('users').where('email', email).first();

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      console.error('Incorrect password');
    }
    console.error('Incorrect email');
  }
  

  async updateToken(id, refreshToken) {
    const rows = await query(
      "UPDATE student SET refreshToken = ? WHERE id = ?",
      [refreshToken, id]
    );

    console.log(rows);

    return rows;
  }
}

module.exports = UserModel

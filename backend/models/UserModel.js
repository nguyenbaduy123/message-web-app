const query = require("../db/database");
const bcrypt = require("bcryptjs");
const knex = require("knex");
const knexConfig = require("../knexfile");

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
    const result = await query(
      "INSERT INTO users (username, email, fullname, password, image_url, role_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.username,
        this.email,
        this.fullname,
        hashedPassword,
        this.image_url,
        this.role_id,
      ]
    );

    const insertedId = result[0].insertId;
    const insertedUser = await query("SELECT * FROM users WHERE id = ?", [
      insertedId,
    ]);

    return insertedUser[0];
  }

  static async findAll() {
    const sql = "SELECT * FROM users";
    const params = [];

    const rows = await query(sql, params);

    return rows[0];
  }

  static login = async (email, password) => {
    const user = await db("users").where("email", email).first();

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return { success: true, user: user };
      }
      return { success: false, error: "Incorrect password" };
    }
    return { success: false, error: "Incorrect email" };
  };

  async updateToken(id, refreshToken) {
    const rows = await query(
      "UPDATE student SET refreshToken = ? WHERE id = ?",
      [refreshToken, id]
    );

    console.log(rows);

    return rows;
  }

  static async getPrivateMessage(id) {
    const user = await db("users").where("id", id).first();
    const msg = await db("private_message")
      .where("from_id", id)
      .orWhere("to_id", id);

    const data = { ...user, messages: msg };

    if (data) return data;
  }

  static async getAllPrivateMessage(id) {
    const users = await db("users").whereNot("id", id);

    let allData = [];

    const res = await Promise.all(
      users.map(async (user) => {
        const msg = await db("private_message")
          .where("from_id", user.id)
          .andWhere("to_id", id)
          .orWhere("to_id", user.id)
          .andWhere("from_id", id);

        return { ...user, messages: msg };
      })
    );

    res.map((data) => (allData = [...allData, data]));

    if (allData) return allData;
  }
}

module.exports = UserModel;

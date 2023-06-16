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

  static async updateToken(id, refreshToken) {
    const rows = await query("UPDATE users SET refreshToken = ? WHERE id = ?", [
      refreshToken,
      id,
    ]);

    console.log(rows);

    return rows;
  }
  static async searchUsers(userId, keyword) {
    try {
      const result = await db
        .select("id", "username", "fullname", "image_url")
        .from("users")
        .where("fullname", "like", `%${keyword}%`)
        .whereNot("id", userId);
      return { success: true, result: result, statusCode: 200 };
    } catch (error) {
      console.error("Error search user: ", user);
      return { success: false, statusCode: 505 };
    }
  }

  static async getUser(id) {
    try {
      const user = await db("users").where("id", id).first();
      return { success: true, statusCode: 200, user: user };
    } catch (error) {
      console.error("Error get user: ", error);
      return { success: false, statusCode: 505 };
    }
  }

  static async updateUser(userId, userData) {
    console.log(userId);
    console.log(userData);
    try {
      const result = await db("users").update(userData).where("id", userId);
      return {
        success: true,
        statusCode: 200,
        message: "Update user successful",
      };
    } catch (error) {
      console.error("Update user error: ", error);
      return {
        success: false,
        statusCode: 500,
        message: "Failed to update user",
      };
    }
  }
}

module.exports = UserModel;

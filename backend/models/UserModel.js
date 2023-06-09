const query = require("../db/database");
const db = require("../db/db_instance");
const bcrypt = require("bcryptjs");

class UserModel {
  constructor(user) {
    this.id = user.id || null;
    this.username = user.username || null;
    this.email = user.email || null;
    this.fullname = user.fullname || null;
    this.password = user.password || null;
    this.image_url =
      user.image_url ||
      "default_avatar_" + Math.floor(Math.random() * 3) + ".jpg";
    this.bg_url = user.bg_url || "default_bg.jpg";
    this.hometown = user.hometown || "Hà nội";
    this.studied_at = user.studied_at || "Đại học Bách Khoa";
    this.current_education = user.current_education || "Đại học Bách Khoa";
    this.status = user.status || "Your status";
    this.address = user.address || "Hanoi, Vietnam";
    this.role_id = 2;
    this.created_at = user.created_at || null;
    this.refreshToken = user.refreshToken || null;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const result = await query(
      "INSERT INTO users (username, email, fullname, password, image_url, \
        bg_url, hometown, studied_at, current_education, status, address, role_id) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.username,
        this.email,
        this.fullname,
        hashedPassword,
        this.image_url,
        this.bg_url,
        this.hometown,
        this.studied_at,
        this.current_education,
        this.status,
        this.address,
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

  static async saveAvatarImage(id, image_url) {
    const res = await db("users").where("id", id).update({
      image_url: image_url,
    });

    return res;
  }

  static async saveBgImage(id, image_url) {
    const res = await db("users").where("id", id).update({
      bg_url: image_url,
    });

    return res;
  }
}

module.exports = UserModel;

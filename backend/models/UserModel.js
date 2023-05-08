const query = require("../db/database");
const bcrypt = require("bcryptjs");

class UserModel {
  constructor(user) {
    this.id = user.id || null;
    this.username = user.name || null;
    this.email = user.email || null;
    this.fullname = user.fullname || null;
    this.password = user.password || null;
    this.image_url = user.image_url || null;
    this.role_id = user.role_id || null;
    this.created_at = user.created_at || null;
    this.refreshToken = user.refreshToken || null;
  }

  async save() {
    await query("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
      this.username,
      this.email,
      this.fullname,
      bcrypt.hash(this.password, 10),
      this.image_url,
      this.role_id,
      this.created_at,
      this.refreshToken,
    ]);

    console.log(this.name);
    console.log("Saved");
    return true;
  }

  static async findAll() {
    const sql = "SELECT * FROM users";
    const params = [];

    const rows = await query(sql, params);
    console.log(rows);

    return rows;
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

module.exports = UserModel;

const query = require("../db/database");

class UserModel {
  constructor(user) {
    this.id = user.id || null;
    this.name = user.name || null;
    this.email = user.email || null;
    this.password = user.password || null;
    this.refreshToken = user.refreshToken || null;
    this.registeredAt = user.registeredAt || null;
  }

  async save() {
    await query("INSERT INTO student VALUES (?, ?, ?)", [
      this.name,
      this.email,
      this.password,
    ]);

    console.log(this.name);
    console.log("Saved");
    return true;
  }

  async findAll() {
    const sql = "SELECT * FROM student";
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

module.exports = { UserModel };

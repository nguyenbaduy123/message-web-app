const query = require("../db/database");
const bcrypt = require("bcryptjs");

class GroupMessageModel {
  constructor(msg) {
    this.id = msg.id || null;
    this.group_id = msg.group_id || null;
    this.user_id = msg.user_id || null;
    this.message = msg.message || null;
    this.created_at = msg.created_at || null;
    this.updated_at = msg.updated_at || null;
  }

  async save() {
    await query(
      "INSERT INTO group_message (group_id, user_id, message) VALUES (?, ?, ?);",
      [this.group_id, this.user_id, this.message]
    );

    console.log(this.message);
    console.log("Saved");
    return true;
  }

  static async findAll() {
    const sql = "SELECT * FROM group_message";
    const params = [];

    const rows = await query(sql, params);
    console.log(rows);

    return rows;
  }

  static async findByGroupId() {
    const sql = "SELECT * FROM group_message WHERE group_id = ?";
    const params = [this.group_id];

    const rows = await query(sql, params);

    console.log(rows);

    return rows;
  }
}

module.exports = GroupMessageModel;

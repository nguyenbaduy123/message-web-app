const query = require("../db/database");
const bcrypt = require("bcryptjs");

class PrivateMessageModel {
  constructor(msg) {
    this.id = msg.id || null;
    this.from_id = msg.from_id || null;
    this.to_id = msg.to_id || null;
    this.message = msg.message || null;
    this.created_at = msg.created_at || null;
    this.updated_at = msg.updated_at || null;
  }

  async save() {
    const result = await query(
      "INSERT INTO private_message (from_id, to_id, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
      [this.from_id, this.to_id, this.message, this.created_at, this.updated_at]
    );

    console.log("Saved");
    return result;
  }

  static async findAll() {
    const sql = "SELECT * FROM private_message";
    const params = [];

    const rows = await query(sql, params);
    console.log(rows);

    return rows;
  }

  static async findByGroupId() {
    const sql = "SELECT * FROM private_message WHERE to_id = ?";
    const params = [this.to_id];

    const rows = await query(sql, params);

    console.log(rows);

    return rows;
  }
}

module.exports = PrivateMessageModel;

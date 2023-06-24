const query = require("../db/database");
const bcrypt = require("bcryptjs");
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

class GroupMessageModel {
  constructor(msg) {
    this.id = msg.id || null;
    this.group_id = msg.group_id || null;
    this.user_id = msg.user_id || null;
    this.message = msg.message || null;
    this.created_at = msg.created_at || null;
    this.updated_at = msg.updated_at || null;
    this.message_img = msg.message_img || null;
  }

  async save() {
    const rows = await query(
      "INSERT INTO group_message (group_id, user_id, message) VALUES (?, ?, ?);",
      [this.group_id, this.user_id, this.message]
    );

    return { id: rows[0].insertId };
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

  static async saveImage(id, message_img) {
    const res = await db("group_message").where("id", id).update({
      message_img: message_img,
    });

    return res;
  }
}

module.exports = GroupMessageModel;

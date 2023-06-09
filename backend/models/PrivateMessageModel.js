const query = require("../db/database");
const db = require("../db/db_instance");

class PrivateMessageModel {
  constructor(msg) {
    this.id = msg.id || null;
    this.from_id = msg.from_id || null;
    this.to_id = msg.to_id || null;
    this.message = msg.message || null;
    this.created_at = msg.created_at || null;
    this.updated_at = msg.updated_at || null;
    this.message_img = msg.message_img || null;
  }

  async save() {
    const result = await query(
      "INSERT INTO private_message (from_id, to_id, message) VALUES (?, ?, ?);",
      [this.from_id, this.to_id, this.message]
    );

    console.log("Saved");
    return { id: result[0].insertId };
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
          .join("users", "users.id", "=", "private_message.from_id")
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

  static async saveImage(id, message_img) {
    const res = await db("private_message").where("id", id).update({
      message_img: message_img,
    });

    return res;
  }
}

module.exports = PrivateMessageModel;

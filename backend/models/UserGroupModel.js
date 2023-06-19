const query = require("../db/database");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

class UserGroupModel {
  constructor(data) {
    this.id = data.id || null;
    this.group_id = data.group_id || null;
    this.user_id = data.user_id || null;
  }

  async save() {
    const res = await db("group_user").insert({
      group_id: this.group_id,
      user_id: this.user_id,
    });

    return {
      id: res,
      group_id: this.group_id,
      user_id: this.user_id,
    };
  }

  async deleteUserGroup() {
    const group_user = await db("group_user")
      .delete()
      .where("user_id", this.user_id)
      .andWhere("group_id", this.group_id);

    return {
      group_id: this.group_id,
      user_id: this.user_id,
    };
  }
}

module.exports = UserGroupModel;

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

  static async save() {
    db("group_user")
      .insert({
        group_id: this.group_id,
        user_id: this.user_id,
      })
      .then((res) => console.log(res));

    return {
      group_id: this.group_id,
      user_id: this.user_id,
    };
  }
}

module.exports = UserGroupModel;

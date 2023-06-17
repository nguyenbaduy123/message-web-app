const query = require("../db/database");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

class FriendModel {
  constructor(model) {
    this.user_id_1 = model.user_id_1 || null; // User id
    this.user_id_2 = model.user_id_2 || null; // Friend id
  }

  async getFriendList() {
    const sql_1 =
      "SELECT DISTINCT * FROM `users` WHERE id IN \
      ( \
          SELECT user_id_2 FROM friend WHERE user_id_1 = ? \
      ) \
      OR id IN \
      ( \
        SELECT user_id_1 FROM friend WHERE user_id_2 = ? \
        )";
    const params_1 = [this.user_id_1, this.user_id_1];

    const rows_1 = await query(sql_1, params_1);

    const sql_2 =
      "SELECT DISTINCT * FROM `users` WHERE id NOT IN ( \
        SELECT DISTINCT id FROM `users` \
          WHERE id IN( \
            SELECT user_id_2 FROM friend WHERE user_id_1 = ? \
          ) \
          OR id IN( \
            SELECT user_id_1 FROM friend WHERE user_id_2 = ? \
          ) \
          OR id = ? \
      )";

    const params_2 = [this.user_id_1, this.user_id_1, this.user_id_1];
    const rows_2 = await query(sql_2, params_2);

    const rows = { friend: rows_1[0], not_friend: rows_2[0] };
    return rows;
  }
}

module.exports = FriendModel;

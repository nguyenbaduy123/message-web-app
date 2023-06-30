const query = require("../db/database");
const db = require("../db/db_instance");

class FriendModel {
  constructor(model) {
    this.user_id_1 = model.user_id_1 || null; // User id
    this.user_id_2 = model.user_id_2 || null; // Friend id
    this.accepted = model.accepted || null;
  }

  async getFriendList() {
    const sql_1 =
      "SELECT DISTINCT * FROM `users` WHERE id IN \
      ( \
          SELECT user_id_2 FROM friend WHERE user_id_1 = ? AND accepted = 1\
      ) \
      OR id IN \
      ( \
        SELECT user_id_1 FROM friend WHERE user_id_2 = ? AND accepted = 1\
        )";
    const params_1 = [this.user_id_1, this.user_id_1];

    const rows_1 = await query(sql_1, params_1);

    const sql_2 =
      "SELECT DISTINCT * FROM `users` WHERE id NOT IN ( \
        SELECT DISTINCT id FROM `users` \
          WHERE id IN( \
            SELECT user_id_2 FROM friend WHERE user_id_1 = ? AND accepted = 1 \
          ) \
          OR id IN( \
            SELECT user_id_1 FROM friend WHERE user_id_2 = ? AND accepted = 1 \
          ) \
          OR id = ? \
      )";

    const params_2 = [this.user_id_1, this.user_id_1, this.user_id_1];
    const rows_2 = await query(sql_2, params_2);

    const rows_3 = await Promise.all(
      rows_2[0].map(async (item) => {
        const [data] = await db("friend")
          .column("accepted")
          .where("user_id_1", this.user_id_1)
          .andWhere("user_id_2", item.id);
        // .orWhere("user_id_1", item.id)
        // .andWhere("user_id_2", this.user_id_1);

        if (data != undefined) console.log(data.accepted);

        if (data == undefined) return { ...item, accepted: null };
        return { ...item, accepted: data.accepted };
      })
    );

    const rows = { friend: rows_1[0], not_friend: rows_3 };
    return rows;
  }

  async getUserRequest() {
    const sql_1 =
      "SELECT DISTINCT * FROM `users` WHERE id IN \
      ( \
          SELECT user_id_2 FROM friend WHERE user_id_1 = ? AND accepted = 1\
      ) \
      OR id IN \
      ( \
        SELECT user_id_1 FROM friend WHERE user_id_2 = ? AND accepted = 1\
        )";
    const params_1 = [this.user_id_1, this.user_id_1];

    const rows_1 = await query(sql_1, params_1);

    const sql_2 =
      "SELECT DISTINCT * FROM `users` WHERE id NOT IN ( \
        SELECT DISTINCT id FROM `users` \
          WHERE id IN( \
            SELECT user_id_2 FROM friend WHERE user_id_1 = ? AND accepted = 1 \
          ) \
          OR id IN( \
            SELECT user_id_1 FROM friend WHERE user_id_2 = ? AND accepted = 1 \
          ) \
          OR id = ? \
      )";

    const params_2 = [this.user_id_1, this.user_id_1, this.user_id_1];
    const rows_2 = await query(sql_2, params_2);

    const rows_3 = await Promise.all(
      rows_2[0].map(async (item) => {
        const [data] = await db("friend")
          .column("accepted")
          // .where("user_id_1", this.user_id_1)
          // .andWhere("user_id_2", item.id);
          .orWhere("user_id_1", item.id)
          .andWhere("user_id_2", this.user_id_1);

        if (data != undefined) console.log(data.accepted);

        if (data == undefined) return { ...item, accepted: null };
        return { ...item, accepted: data.accepted };
      })
    );

    const rows = { friend: rows_1[0], not_friend: rows_3 };
    return rows;
  }

  async updatedFriend() {
    console.log(this.user_id_1, this.user_id_2, this.accepted);
    const data = await db("friend")
      .update({
        user_id_1: this.user_id_1,
        user_id_2: this.user_id_2,
        accepted: this.accepted,
      })
      .where("user_id_1", this.user_id_1)
      .andWhere("user_id_2", this.user_id_2);

    if (this.accepted === "1" || this.accepted == null) {
      const data2 = await db("friend")
        .update({
          user_id_1: this.user_id_2,
          user_id_2: this.user_id_1,
          accepted: this.accepted,
        })
        .where("user_id_1", this.user_id_2)
        .andWhere("user_id_2", this.user_id_1);

      if (!data2) {
        const res = await db("friend").insert({
          user_id_1: this.user_id_2,
          user_id_2: this.user_id_1,
          accepted: this.accepted,
        });
      }
    }

    if (data) return "Update friend";

    const res = await db("friend").insert({
      user_id_1: this.user_id_1,
      user_id_2: this.user_id_2,
      accepted: this.accepted,
    });

    return "Insert friend";
  }
}

module.exports = FriendModel;

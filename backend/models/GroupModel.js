const query = require("../db/database");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

class GroupModel {
  constructor(group) {
    this.id = group.id || null;
    this.name = group.name || null;
    this.number_member = group.number_member || null;
    this.image_url = group.image_url || null;
  }

  async save() {
    const res = await db("groups").insert({
      name: this.name,
      number_member: this.number_member,
    });

    return {
      id: res[0],
      name: this.name,
      number_member: this.number_member,
    };
  }

  static async saveImage(id, image_url) {
    const res = await db("groups").where("id", id).update({
      image_url: image_url,
    });

    return res;
  }

  static async getAllGroupMessage(id) {
    const group_user = await db("group_user").where("user_id", id);

    let allGroup = await Promise.all(
      group_user.map(async (item) => {
        const [group] = await db("groups").where("id", item.group_id);
        return group;
      })
    );

    allGroup = await Promise.all(
      allGroup.map(async (item) => {
        const groupMessage = await db("group_message").where(
          "group_id",
          item.id
        );

        return { ...item, messages: groupMessage };
      })
    );

    return allGroup;
  }
}

module.exports = GroupModel;

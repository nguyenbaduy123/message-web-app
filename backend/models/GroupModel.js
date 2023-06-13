const query = require("../db/database");
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

class GroupModel {
  constructor(group) {
    this.id = group.id || null;
    this.name = group.name || null;
    this.number_member = group.number_member || null;
  }

  async save() {
    db("groups")
      .insert({
        name: this.name,
        number_member: this.number_member,
      })
      .then((res) => console.log(res));

    return {
      name: this.name,
      number_member: this.number_member,
    };
  }
}

module.exports = GroupModel;

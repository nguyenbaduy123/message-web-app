const query = require('../db/database');

class User {
    constructor(user) {
        this.id = user.id || null;
        this.name = user.name || null;
        this.email = user.email || null;
        this.password = user.password || null;
        this.gender = user.gender || null;
        this.age = user.age || null;
        this.registeredAt = user.registeredAt || null;
    }

    async save() {
        await query("INSERT INTO student VALUES (?, ?, ?, ?)", [this.name, this.age, this.gender, this.id], (rows) => console.log(rows));

        console.log(this.name);
        console.log("Saved");
        return true;
    }

    async find() {
        await query("SELECT * FROM student", [], (data) => console.log(data));

        // console.log(res);

        return true;
    }
}

module.exports = User;
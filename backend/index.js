const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const http = require("http");
const User = require("./models/User");
const dbQuery = require("./db/database");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})


// io.on("connection", (socket) => {
//   const id = socket.handshake.query.id;
//   socket.join(id);

//   console.log(id);
// });

server.listen(port, () => {
    const userInfo = {
        id: 12,
        name: 5,
        email: "",
        password: 1234,
        gender: "Nam",
        age: 20,
        registeredAt: "",
    }

    const user = new User(userInfo);

    user.save();

    // dbQuery("SELECT * FROM student", [], (data) => console.log(data))


});

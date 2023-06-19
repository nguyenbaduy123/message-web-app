const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const authRoute = require("./routes/Auth");
const messageRoute = require("./routes/Message");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", authRoute);
app.use("/api/msg", messageRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("connected", (id) => {
    users[id] = socket.id;
    console.log("Ok");
  });

  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data);
    io.to(users[data.to_id]).emit("receive_message", data);
    io.to(users[data.from_id]).emit("receive_message", data);
  });

  socket.on("send_group_message", (data) => {
    console.log(data);
    if (socket.rooms.has(data.group_id))
      io.to(data.group_id).emit("receive_group_message", data);
    else io.to(data.user_id).emit("forbidden");
  });

  socket.on("init-room", (user_id, data) => {
    data.map((item) => {
      socket.join(item.id);
      // console.log(">>> Nguoi dung " + user_id + " da tham gia nhom " + item.id);
    });
  });

  socket.on("leave-room", (group_id) => {
    socket.leave(group_id);
    console.log(">>> Leave room " + group_id);
  });

  socket.on("remove-user", (user_id, group_id) => {
    socket.to(users[user_id]).emit("listen-remove", group_id);
  });

  socket.on("create-room", (user_id, group_id, choosenMember) => {
    socket.join(group_id);
    // console.log(">>> Nguoi dung " + user_id + " da tham gia nhom");

    choosenMember.map((item) => {
      io.to(users[item.id]).emit("request-join", group_id);
    });
  });

  socket.on("accept-join", (user_id, group_id) => {
    // console.log(">>> Nguoi dung " + user_id + " da tham gia nhom");
    socket.join(group_id);
  });
});

server.listen(port, () => {
  console.log(`App running at port ${port}`);
});

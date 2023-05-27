const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const authRoute = require("./routes/Auth");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", authRoute);

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
    console.log(data);
    io.to(users[data.to_id]).emit("receive_message", data);
    io.to(users[data.from_id]).emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log(`App running at port ${port}`);
});

const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const http = require("http");
const authRoute = require("./routes/Auth");
const query = require("./db/database");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use("/api", authRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    // socket.broadcast.emit("receive_message", data);
    io.emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log(`App running at port ${port}`);
});

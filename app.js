const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

let interval;

const getApiAndEmit = async (socket) => {
  try {
    const res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather?id=4011743&units=metric&appid=35351c47c46f7379dd515fabe9e44be0"
    );
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

io.on("connection", (socket) => {
  console.log("Connected UwU");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Disconnected UnU");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

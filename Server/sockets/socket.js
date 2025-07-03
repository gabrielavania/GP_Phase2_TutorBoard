const { Server } = require("socket.io");

const rooms = new Map();

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://phase2-tutor-board.vercel.app",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", ({ roomCode, userName }) => {
      socket.join(roomCode);
      if (!rooms.has(roomCode)) rooms.set(roomCode, new Set());
      rooms.get(roomCode).add(socket.id);

      io.to(roomCode).emit("user-joined", { userName, socketId: socket.id });
      console.log(`${userName} joined room ${roomCode}`);
    });

    socket.on("draw-data", ({ roomCode, data }) => {
      socket.to(roomCode).emit("draw-data", data);
    });

    socket.on("clear-canvas", (roomCode) => {
      console.log(`Clear canvas in room ${roomCode}`);
      socket.to(roomCode).emit("clear-canvas");
    });

    socket.on("ai-result", ({ roomCode, explanation }) => {
      io.to(roomCode).emit("ai-result", { explanation });
    });

    socket.on("disconnect", () => {
      for (let [roomCode, socketSet] of rooms.entries()) {
        socketSet.delete(socket.id);
        if (socketSet.size === 0) rooms.delete(roomCode);
      }
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = initSocket;

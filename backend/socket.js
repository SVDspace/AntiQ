const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  if (io) {
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinQueueRoom", (queueId) => {
      if (!queueId) return;

      const roomId = String(queueId);
      socket.join(roomId);
      socket.emit("queue:roomJoined", { queueId: roomId });
    });

    socket.on("leaveQueueRoom", (queueId) => {
      if (!queueId) return;
      socket.leave(String(queueId));
    });
  });

  return io;
};

const getSocket = () => io;

const emitQueueUpdate = (queueId, eventName, payload = {}) => {
  if (!io || !queueId) return;

  io.to(String(queueId)).emit(eventName, {
    queueId: String(queueId),
    ...payload,
  });
};

module.exports = {
  initSocket,
  getSocket,
  emitQueueUpdate,
};

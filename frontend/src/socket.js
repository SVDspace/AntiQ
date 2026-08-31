import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;
const joinedRooms = new Set();

export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('antiq_token');

    socket = io(SOCKET_URL, {
      autoConnect: Boolean(token),
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      joinedRooms.forEach((queueId) => {
        socket.emit('joinQueueRoom', queueId);
      });
    });
  }

  return socket;
};

export const connectSocket = () => {
  const socketInstance = getSocket();

  if (!socketInstance.connected && localStorage.getItem('antiq_token')) {
    socketInstance.connect();
  }

  return socketInstance;
};

export const joinQueueRoom = (queueId) => {
  if (!queueId) return;

  const roomId = String(queueId);
  joinedRooms.add(roomId);

  const socketInstance = connectSocket();
  socketInstance.emit('joinQueueRoom', roomId);
};

export const leaveQueueRoom = (queueId) => {
  if (!queueId) return;

  const roomId = String(queueId);
  joinedRooms.delete(roomId);

  const socketInstance = getSocket();
  if (socketInstance.connected) {
    socketInstance.emit('leaveQueueRoom', roomId);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    joinedRooms.clear();
  }
};

export default getSocket;

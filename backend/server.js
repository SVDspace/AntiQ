const queueRoutes = require("./routes/queueRoutes");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const { initSocket } = require("./socket");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
app.use("/api/queues", queueRoutes);

const tokenRoutes = require("./routes/tokenRoutes");
app.use("/api/tokens", tokenRoutes);

app.get(
  "/health",
  (req, res) => {
    res.json({
      status:
      "Server Running",
    });
  }
);

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

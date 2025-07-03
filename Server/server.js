if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { createServer } = require("node:http");
const app = require("./app");
const initSocket = require("./sockets/socket");

const httpServer = createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

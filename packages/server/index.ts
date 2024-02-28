import http from 'http';
import express from 'express';
import path from "path";
// import { HelloRouteur } from './routes/hello.router';
import cors from 'cors';
import { SocketService } from './services/socketService';

const DIST_DIR = path.join(__dirname, "../../client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const app = express();
const server = http.createServer(app);
const socketService = new SocketService(server);

const port = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));

app.get("*", (req, res, next) => {
  res.sendFile(HTML_FILE);
});

server.listen(port, () => {
  process.stdout.write(`Server started on port: ${port}\n`);
});
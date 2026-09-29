import 'dotenv/config';
import express from 'express';
import { router } from './models/chat/chats';
import { createServer } from 'http';
import { initSocket } from './models/socket/socket.service';

const app = express();
const port = Number(process.env.PORT) || 3000;
const httpServer = createServer(app);
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
});

const v1Router = express.Router();

v1Router.use('/chat', router);
v1Router.use('/messages', router);
v1Router.use('/user', router);

app.use('/api/v1', v1Router);

initSocket(httpServer);

httpServer.listen(port, '0.0.0.0', () => {
	console.log(`Server is running on port ${port}`);
});

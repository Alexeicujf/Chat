import express from 'express';
import { router } from './models/chat/chats';
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
});

// app.use('/api/chat', router);
// app.use('/api/user', router);
// app.use('/api/message', router);

// app.listen(port, () => {
// 	console.log(`http://localhost:${port}`);
// });

const v1Router = express.Router();

v1Router.use('/chat', router);
v1Router.use('/messages', router);
v1Router.use('/user', router);

app.use('/models/v1', v1Router);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

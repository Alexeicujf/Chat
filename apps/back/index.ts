import express from 'express';
import cors from 'cors';
import { router as chatRouter } from './models/chat/chats';
import { router as messageRouter } from './models/messages/messages';
import { router as userRouter } from './models/user/user';
import { router as authRouter } from './models/auth/auth.route';
import { config } from '@/config/config';
import cookieParser from 'cookie-parser';

const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(cookieParser());
app.use(
	cors({
		origin: config.server.frontendUrl,
		credentials: true,
	}),
);
app.use(express.json());
app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
});

const v1Router = express.Router();

v1Router.use('/chat', chatRouter);
v1Router.use('/messages', messageRouter);
v1Router.use('/user', userRouter);
v1Router.use('/auth', authRouter);
app.use('/api/v1', v1Router);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

import express from 'express';
import { router } from './api/chat/index';
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'hello world' });
});

app.use('/api/chat', router);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

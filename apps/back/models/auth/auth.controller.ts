import { error } from 'node:console';
import { registerUser } from './auth.service';
import { Request, Response } from 'express';
export const registerUserController = async (req: Request, res: Response) => {
	const { email, password, nick } = req.body;

	if (!email || !password || !nick) {
		return res.status(400).json({ error: 'Некорректные данные' });
	}

	const { user, accessToken } = await registerUser(email, password, nick);
	res.cookie('accessToken', accessToken);
	return res.status(201).json({ user: { id: user.id, email: user.email, nick: user.nick } });
};

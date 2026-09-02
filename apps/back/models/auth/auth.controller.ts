import { loginUser, registerUser } from './auth.service';
import { Request, Response } from 'express';
import { issueTokens } from './auth.utils';

export const registerUserController = async (req: Request, res: Response) => {
	const { email, password, nick } = req.body;

	if (!email || !password || !nick) {
		return res.status(400).json({ error: 'Некорректные данные' });
	}

	const { user } = await registerUser(email, password, nick);
	await issueTokens(res, user);
	return res.status(201).json({ user: { id: user.id, email: user.email, nick: user.nick } });
};

export const loginUserConstroller = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Некорректные данные' });
	}

	const user = await loginUser(email, password);
	await issueTokens(res, user);
	return res.status(200).json({ user: { id: user.id, email: user.email, nick: user.nick } });
};

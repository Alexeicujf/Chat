import { loginUser, registerUser, refreshUserSession } from './auth.service';
import { json, Request, Response } from 'express';
import { issueTokens, issueAccessToken } from './auth.utils';

export const registerUserController = async (req: Request, res: Response) => {
	const { email, password, nick } = req.body;

	if (!email || !password || !nick) {
		return res.status(400).json({ error: 'Некорректные данные' });
	}

	const { user } = await registerUser(email, password, nick);
	await issueTokens(res, user);
	return res.status(201).json({ user: { id: user.id, email: user.email, nick: user.nick } });
};

export const loginUserController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Некорректные данные' });
	}

	const user = await loginUser(email, password);
	console.log(user);
	await issueTokens(res, user);
	return res.status(200).json({ user: { id: user.id, email: user.email, nick: user.nick } });
};

export const refreshUserController = async (req: Request, res: Response) => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) {
			return res.status(401).json('refresh token отсутствует');
		}
		const user = await refreshUserSession(refreshToken);

		await issueAccessToken(res, user);

		return res.status(200).json({
			user: { id: user.id, email: user.email, nick: user.nick },
		});
	} catch (error) {
		console.error('Ошибка рефреша:', error);
		return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
	}
};

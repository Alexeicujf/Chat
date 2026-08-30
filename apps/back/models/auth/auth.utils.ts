import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { accessTokenCookie, refreshTokenCookie } from './auth.cookies';

interface IUser {
	id: string | number;
	email: string;
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const issueTokens = async (res: Response, user: IUser) => {
	if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
		throw new Error('JWT секреты не заданы в переменных окружения!');
	}

	const accessToken = jwt.sign({ sub: user.id, email: user.email }, JWT_ACCESS_SECRET, {
		expiresIn: '15m',
	});

	const refreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, {
		expiresIn: '30d',
	});
	res.cookie('accessToken', accessToken, accessTokenCookie);
	res.cookie('refreshToken', refreshToken, refreshTokenCookie);
};

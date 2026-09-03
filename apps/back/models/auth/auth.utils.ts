import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { accessTokenCookie, refreshTokenCookie } from './auth.cookies';
import { config } from '@/config/config';

interface IUser {
	id: string | number;
	email: string;
}

export const issueTokens = async (res: Response, user: IUser) => {
	const { accessSecret, refreshSecret } = config.jwt;

	const accessToken = jwt.sign({ sub: user.id, email: user.email }, accessSecret, {
		expiresIn: '15m',
	});

	const refreshToken = jwt.sign({ sub: user.id }, refreshSecret, { expiresIn: '30d' });

	res.cookie('accessToken', accessToken, accessTokenCookie);
	res.cookie('refreshToken', refreshToken, refreshTokenCookie);
};

export const issueAccessToken = async (res: Response, user: IUser) => {
	const { accessSecret } = config.jwt;

	const accessToken = jwt.sign({ sub: user.id, email: user.email }, accessSecret, {
		expiresIn: '15m',
	});

	res.cookie('accessToken', accessToken, accessTokenCookie);
};

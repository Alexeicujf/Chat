import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { accessTokenCookie, refreshTokenCookie } from './auth.cookies';
import { config } from '@/config/config';

interface IUser {
	id: string | number;
	email: string;
}

export const issueTokens = async (res: Response, user: IUser) => {
	const { accessSecret, refreshSecret, accessExpiresIn, refreshExpiresIn } = config.jwt;

	const accessToken = jwt.sign({ sub: user.id, email: user.email }, accessSecret, {
		expiresIn: accessExpiresIn as SignOptions['expiresIn'],
	});

	const refreshToken = jwt.sign({ sub: user.id }, refreshSecret, {
		expiresIn: refreshExpiresIn as SignOptions['expiresIn'],
	});

	res.cookie('accessToken', accessToken, accessTokenCookie);
	res.cookie('refreshToken', refreshToken, refreshTokenCookie);
};

export const issueAccessToken = async (res: Response, user: IUser) => {
	const { accessSecret, accessExpiresIn } = config.jwt;

	const accessToken = jwt.sign({ sub: user.id, email: user.email }, accessSecret, {
		expiresIn: accessExpiresIn as SignOptions['expiresIn'],
	});

	res.cookie('accessToken', accessToken, accessTokenCookie);
};


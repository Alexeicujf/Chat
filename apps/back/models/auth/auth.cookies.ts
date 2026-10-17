import { timeToMs } from '@/libs/time';

const isProduction = process.env.NODE_ENV === 'production';

export const accessTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: timeToMs(process.env.JWT_ACCESS_EXPIRES_IN || '2m'),
	path: '/',
};

export const refreshTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: timeToMs(process.env.JWT_REFRESH_EXPIRES_IN || '3m'),
	path: '/',
};

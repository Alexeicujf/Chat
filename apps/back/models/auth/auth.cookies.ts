const isProduction = process.env.NODE_ENV === 'production';

export const accessTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: 15 * 60 * 1000,
	path: '/',
};

export const refreshTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: 30 * 24 * 60 * 60 * 1000,
	path: '/api/v1/auth/refresh',
};

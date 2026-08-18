const isProduction = process.env.NODE_ENV === 'production';

export const accessTokenCookie = {
	// почитать!
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: 15 * 60 * 1000,
	path: '/',
};

export const refreshTokenCookie = {
	// почитать!!!
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: 30 * 24 * 60 * 60 * 1000,
	path: '/api/auth/refresh',
};

const isProduction = process.env.NODE_ENV === 'production';

const ACCESS_DURATION_SEC = Number(process.env.JWT_ACCESS_EXPIRES_IN_SEC) || 900;
const REFRESH_DURATION_SEC = Number(process.env.JWT_REFRESH_EXPIRES_IN_SEC) || 25920000;
export const accessTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: ACCESS_DURATION_SEC * 1000,
	path: '/',
};

export const refreshTokenCookie = {
	httpOnly: true,
	secure: isProduction,
	sameSite: 'lax' as const,
	maxAge: REFRESH_DURATION_SEC * 1000,
	path: '/api/v1/auth/refresh',
};

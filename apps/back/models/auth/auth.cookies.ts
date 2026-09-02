const isNode = typeof window === 'undefined';

// @ts-ignore
const currentEnv = isNode ? (eval('process') as any)?.env?.NODE_ENV : '';

export const accessTokenCookie = {
	httpOnly: true,
	secure: currentEnv === 'production', // На локалке станет false, куки запишутся по HTTP!
	sameSite: 'lax' as const,
	maxAge: 15 * 60 * 1000,
	path: '/',
};

export const refreshTokenCookie = {
	httpOnly: true,
	secure: currentEnv === 'production',
	sameSite: 'lax' as const,
	maxAge: 30 * 24 * 60 * 60 * 1000,
	path: '/api/v1/auth/refresh', // Наш правильный v1 путь
};

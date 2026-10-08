import 'dotenv/config';
import * as zod from 'zod';

const envSchema = zod.object({
	PORT: zod.string().transform(Number).default(8080),
	DATABASE_URL: zod.string().url('DATABASE_URL должен быть валидным URL-адресом'),
	JWT_ACCESS_SECRET: zod.string(),
	JWT_REFRESH_SECRET: zod.string(),
	FRONTEND_URL: zod.string().default('http://localhost:5173'),
	JWT_ACCESS_EXPIRES_IN: zod.string().default('15m'),
	JWT_REFRESH_EXPIRES_IN: zod.string().default('7d'),
});

const parsedEnv = envSchema.parse(process.env);

export const config = {
	server: {
		port: parsedEnv.PORT,
		frontendUrl: parsedEnv.FRONTEND_URL,
	},
	db: {
		url: parsedEnv.DATABASE_URL,
	},
	jwt: {
		accessSecret: parsedEnv.JWT_ACCESS_SECRET,
		refreshSecret: parsedEnv.JWT_REFRESH_SECRET,
		accessExpiresIn: parsedEnv.JWT_ACCESS_EXPIRES_IN,
		refreshExpiresIn: parsedEnv.JWT_REFRESH_EXPIRES_IN,
	},
} as const;

export type Config = typeof config;

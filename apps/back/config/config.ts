import 'dotenv/config';
import * as zod from 'zod';

const envSchema = zod.object({
	PORT: zod.string().transform(Number).default(8080),
	DATABASE_URL: zod.string().url('DATABASE_URL должен быть валидным URL-адресом'),
	JWT_ACCESS_SECRET: zod.string().min(1, 'Секрет аксеса обязателен для запуска сервера'),
	JWT_REFRESH_SECRET: zod.string().min(1, 'Секрет рефреша обязателен для запуска сервера'),
	FRONTEND_URL: zod.string().default('http://localhost:5173'),
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
	},
} as const;

export type Config = typeof config;

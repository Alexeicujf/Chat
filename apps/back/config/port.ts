import 'dotenv/config';
import * as zod from 'zod';

const envSchema = zod.object({
	// Исправили опечатку с PORD на PORT
	PORT: zod.string().transform(Number).default(8080),
	DATABASE_URL: zod.string().url('DATABASE_URL должен быть валидным URL-адресом'),
	JWT_ACCESS_SECRET: zod.string().min(1, 'Секрет аксеса обязателен'),
	JWT_REFRESH_SECRET: zod.string().min(1, 'Секрет рефреша обязателен'),
});

const env = envSchema.parse(process.env);

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'fallback_secret_key';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_key';

export const config = {
	server: {
		port: env.PORT,
	},
	db: {
		url: env.DATABASE_URL,
	},
} as const;

export type Config = typeof config;

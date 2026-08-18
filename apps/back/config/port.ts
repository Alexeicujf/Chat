import 'dotenv/config';
import * as zod from 'zod';

const envSchema = zod.object({
	// Исправили опечатку с PORD на PORT
	PORT: zod.string().transform(Number).default(8080),
	DATABASE_URL: zod.string().url('DATABASE_URL должен быть валидным URL-адресом'),
});

const env = envSchema.parse(process.env);

export const config = {
	server: {
		port: env.PORT,
	},
	db: {
		url: env.DATABASE_URL,
	},
} as const;

export type Config = typeof config;

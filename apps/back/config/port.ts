import dotenv from 'dotenv';
import path from 'path';
import * as zod from 'zod';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const envSchema = zod.object({
	BACKEND_PORD: zod.string().transform(Number).default(8080),
	DATABASE_URL: zod.string().url('DATABASE_URL должен быть валидным URL-адресом'),
});

const env = envSchema.parse(process.env);

export const config = {
	server: {
		port: env.BACKEND_PORD,
	},
	db: {
		url: env.DATABASE_URL,
	},
} as const;

export type Config = typeof config;

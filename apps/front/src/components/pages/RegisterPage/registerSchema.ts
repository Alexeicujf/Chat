import * as zod from 'zod';

export const registerSchema = zod
	.object({
		nick: zod.string().min(2, 'Ник неим должен содержать хотя бы два символа '),
		email: zod.string().email('Введите корретный email'),
		password: zod.string().min(6, 'Пороль долженбыть от 6 символов'),
		confirmPassword: zod.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пороли не совпадают',
		path: ['confirmPassword'],
	});
export type RegisterFormValues = zod.infer<typeof registerSchema>;

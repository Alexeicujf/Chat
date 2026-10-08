import * as zod from 'zod';

export const registerSchema = zod
	.object({
		nick: zod.string().min(2, 'Ник неим должен содержать хотя бы два символа '),
		email: zod.string().email('Введите корретный email'),
		password: zod
			.string()
			.min(8, 'Пороль долженбыть от 8 символов') // 2. Добавляем проверку на заглавную, строчную буквы и цифру (только латиница)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
				'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную букву (латиница)',
			),

		confirmPassword: zod.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пороли не совпадают',
		path: ['confirmPassword'],
	});
export type RegisterFormValues = zod.infer<typeof registerSchema>;

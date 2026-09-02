import * as zod from 'zod';

export const loginSchema = zod.object({
	email: zod.string().email('Введите корректный email'),
	password: zod.string().min(6, 'Пароль должен быть не менее 6 символов'),
});

export type LoginFormValues = zod.infer<typeof loginSchema>;

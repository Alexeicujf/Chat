import * as zod from 'zod';

export const loginSchema = zod.object({
	email: zod.string().email('Введите корректный email'),
	password: zod.string().min(8, 'Пароль должен быть не менее 8 символов'), // Что бы обязательно была 1 заглавная 1 прописная и 1 число и в регистрации тоже
});

export type LoginFormValues = zod.infer<typeof loginSchema>;

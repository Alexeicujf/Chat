import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/atoms/TextField';
import { loginSchema, type LoginFormValues } from './loginSchema';
import { api } from '@/api/api';
import { FormContainer, FormFieldsWrapper, SubmitButton, RedirectButton } from './LoginPage.styled';

export const LoginPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		const { email, password } = data;
		try {
			const response = await api.post(`v1/auth/login`, { email, password });
			navigate('/chat');
		} catch (error) {
			console.error('Ошибка входа', error);
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<FormFieldsWrapper>
				<TextField
					label="Email"
					variant="outlined"
					type="email"
					fullWidth
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>

				<TextField
					label="Пароль"
					variant="outlined"
					type="password"
					fullWidth
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<SubmitButton type="submit" variant="contained" size="large" fullWidth>
					Войти
				</SubmitButton>

				<RedirectButton variant="text" onClick={() => navigate('/auth/register')} fullWidth>
					Ещё нет аккаунта? Зарегистрироваться
				</RedirectButton>
			</FormFieldsWrapper>
		</FormContainer>
	);
};

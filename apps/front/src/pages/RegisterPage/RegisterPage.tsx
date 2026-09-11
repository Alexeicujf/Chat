import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/atoms/TextField';
import { registerSchema, type RegisterFormValues } from './registerSchema';
import { api } from '@/api/api';
import {
	FormContainer,
	FormFieldsWrapper,
	SubmitButton,
	RedirectButton,
} from './RegisterPage.styled';

export const RegisterPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormValues) => {
		const { email, password, nick } = data;

		try {
			const response = await api.post(`v1/auth/register/`, { email, password, nick });
			alert(`Данные обработаны ${response.data.message || 'Успешно!'}`);
			navigate('/');
		} catch (error) {
			console.error('Ошибка регистрации', error);
			alert('Что-то прошло не так');
		}
	};

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<FormFieldsWrapper>
				<TextField
					label="Никнейм"
					variant="outlined"
					fullWidth
					{...register('nick')}
					error={!!errors.nick}
					helperText={errors.nick?.message}
				/>

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

				<TextField
					label="Повторите пароль"
					variant="outlined"
					type="password"
					fullWidth
					{...register('confirmPassword')}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
				/>

				<SubmitButton type="submit" variant="contained" size="large" fullWidth>
					Зарегистрироваться
				</SubmitButton>

				<RedirectButton variant="text" onClick={() => navigate('auth/login')} fullWidth>
					Уже есть аккаунт? Войти
				</RedirectButton>
			</FormFieldsWrapper>
		</FormContainer>
	);
};

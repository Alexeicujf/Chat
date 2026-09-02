import { Button, Box } from '@mui/material';
import { TextField } from '@/components/atoms/TextField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from './registerSchema';
import { api } from '@/api';

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
			const response = await api.post(`/auth/register`, { email, password, nick });
			console.log('Регистрация прошлауспекшно', response.data);
		} catch (error) {
			console.log('Ошибка регистрации', error);
			alert('Что-то прошло не так');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
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

				<Button type="submit" variant="contained" size="large" fullWidth>
					Зарегистрироваться
				</Button>
				<Button
					variant="text"
					sx={{ color: '#94a3b8', textTransform: 'none', mt: 1 }}
					onClick={() => navigate('/login')}
					fullWidth
				>
					Уже есть аккаунт? Войти
				</Button>
			</Box>
		</form>
	);
};

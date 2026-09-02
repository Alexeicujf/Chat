import { Button, Box } from '@mui/material';
import { TextField } from '@/components/atoms/TextField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from './loginSchema';
import { api } from '@/api';

export const LoginPage = () => {
	const navigate = useNavigate();

	const {
		register: login,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		const { email, password } = data;

		try {
			const response = await api.post(`/auth/login`, { email, password });
			console.log('Вход прошел успешно', response.data);
		} catch (error) {
			console.log('Ошибка взода', error);
			alert('Ошибка входа, возможно вы не верно указали данные');
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					width: '100%',
					maxWidth: 400,
					mx: 'auto',
				}}
			>
				<TextField
					label="Email"
					variant="outlined"
					type="email"
					fullWidth
					{...login('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>

				<TextField
					label="Пароль"
					variant="outlined"
					type="password"
					fullWidth
					{...login('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<Button type="submit" variant="contained" size="large" fullWidth>
					Войти
				</Button>

				<Button
					variant="text"
					sx={{ color: '#94a3b8', textTransform: 'none', mt: 1 }}
					onClick={() => navigate('/register')}
					fullWidth
				>
					Ещё нет аккаунта? Зарегистрироваться
				</Button>
			</Box>
		</form>
	);
};

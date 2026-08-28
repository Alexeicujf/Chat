import React, { useState } from 'react';

export const RegisterPage = () => {
	const [register, setRegisntr] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		nick: '',
	});

	const hundleOnChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegisntr((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (register.password !== register.confirmPassword) {
			alert('пороли  не совпадают!');
			return;
		}

		try {
			const response = await fetch(`http://localhost:8080/api/auth/register`, {
				method: `POST`,
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email, password, nick }),
			});
			if (!response.ok) {
				alert('Что-то пошло не так!');
				return;
			}
			const data = response.json();
			console.log('Регистрация прогшла учпешно', data);
		} catch (error) {}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '90vh',
				fontFamily: 'sans-serif',
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '360px',
					padding: '40px 30px',
					backgroundColor: 'rgba(43, 48, 74, 0.95)',
					borderRadius: '16px',
					boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
					color: '#fff',
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: '20px',
						marginBottom: '30px',
						fontSize: '14px',
						fontWeight: 'bold',
						color: '#aaa',
					}}
				>
					<span>ВХОД</span>
					<span style={{ color: '#fff', borderBottom: '2px solid #2979ff', paddingBottom: '4px' }}>
						РЕГИСТРАЦИЯ
					</span>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
					<label
						style={{
							fontSize: '11px',
							fontWeight: 'bold',
							color: '#9aa0a6',
							marginBottom: '8px',
							letterSpacing: '1px',
						}}
					>
						НИКНЕЙМ
					</label>
					<input
						type="text"
						name="nick"
						value={register.nick}
						onChange={hundleOnChenge}
						style={{
							padding: '14px 20px',
							borderRadius: '24px',
							border: 'none',
							backgroundColor: 'rgba(255,255,255,0.08)',
							color: '#fff',
							fontSize: '14px',
							outline: 'none',
						}}
					/>
				</div>

				{/* Поле Email */}
				<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
					<label
						style={{
							fontSize: '11px',
							fontWeight: 'bold',
							color: '#9aa0a6',
							marginBottom: '8px',
							letterSpacing: '1px',
						}}
					>
						EMAIL / ПОЧТА
					</label>
					<input
						type="email"
						name="email"
						value={register.email}
						onChange={hundleOnChenge}
						style={{
							padding: '14px 20px',
							borderRadius: '24px',
							border: 'none',
							backgroundColor: 'rgba(255,255,255,0.08)',
							color: '#fff',
							fontSize: '14px',
							outline: 'none',
						}}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
					<label
						style={{
							fontSize: '11px',
							fontWeight: 'bold',
							color: '#9aa0a6',
							marginBottom: '8px',
							letterSpacing: '1px',
						}}
					>
						ПАРОЛЬ
					</label>
					<input
						type="password"
						name="password"
						value={register.password}
						onChange={hundleOnChenge}
						style={{
							padding: '14px 20px',
							borderRadius: '24px',
							border: 'none',
							backgroundColor: 'rgba(255,255,255,0.08)',
							color: '#fff',
							fontSize: '14px',
							outline: 'none',
						}}
					/>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', marginBottom: '30px' }}>
					<label
						style={{
							fontSize: '11px',
							fontWeight: 'bold',
							color: '#9aa0a6',
							marginBottom: '8px',
							letterSpacing: '1px',
						}}
					>
						ПОДТВЕРЖДЕНИЕ ПАРОЛЯ
					</label>
					<input
						type="password"
						name="confirmPassword"
						value={register.confirmPassword}
						onChange={hundleOnChenge}
						style={{
							padding: '14px 20px',
							borderRadius: '24px',
							border: 'none',
							backgroundColor: 'rgba(255,255,255,0.08)',
							color: '#fff',
							fontSize: '14px',
							outline: 'none',
						}}
					/>
				</div>

				<button
					type="submit"
					style={{
						padding: '14px',
						borderRadius: '24px',
						border: 'none',
						backgroundColor: '#2979ff',
						color: 'white',
						fontWeight: 'bold',
						cursor: 'pointer',
						fontSize: '14px',
						letterSpacing: '1px',
					}}
				>
					ЗАРЕГИСТРИРОВАТЬСЯ
				</button>
			</form>
		</div>
	);
};

import { ChatWrapper } from './ChatPage.style.ts';
import { api } from '@/api/api';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
export const ChatPage = () => {
	const navigate = useNavigate();
	const isChecking = useRef(false);
	useEffect(() => {
		if (isChecking.current) return;
		isChecking.current = true;
		const checkSession = async () => {
			try {
				await api.get('/v1/user');
				navigate('/chat');
			} catch (error) {
				console.error('Сессия не активна', error);
				navigate('/auth/login', { replace: true });
			} finally {
				isChecking.current = false;
			}
		};
		checkSession();
	}, [navigate]);
	return (
		<ChatWrapper>
			<h1>Панель чата (Заглушка)</h1>
		</ChatWrapper>
	);
};

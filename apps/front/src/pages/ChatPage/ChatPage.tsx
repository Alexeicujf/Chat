import { ChatWrapper } from './ChatPage.style';
import { api } from '@/api/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export const ChatPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuthUrl = '/v1/user';
		const checkSession = async () => {
			try {
				await api.get(checkAuthUrl);
				console.log('Сессия активна');
				navigate('/chat');
			} catch (error) {
				console.error('Сессия не активна', error);
				navigate('/login', { replace: true });
			}
		};
		checkSession();
	}, []);
	return (
		<ChatWrapper>
			<h1>Панель чата (Заглушка)</h1>
		</ChatWrapper>
	);
};

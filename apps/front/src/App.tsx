import { Button, Container, Typography, Box, TextField, ButtonGroup } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

interface ISocketMessage {
	chatId: string;
	text: string;
	authorId: number;
}

const styles = {
	mainWrapper: {
		mt: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
	},
	chatWindow: {
		width: '100%',
		height: '250px',
		border: '2px solid #1976d2', // Сделали рамку яркой синей
		borderRadius: 2,
		p: 2,
		overflowY: 'auto',
		bgcolor: '#1e1e1e', // Явно задаем ТЕМНЫЙ фон для окна сообщений
		color: '#ffffff', // Явно задаем БЕЛЫЙ цвет для текста сообщений
	},
	inputForm: {
		display: 'flex',
		width: '100%',
		gap: 1,
		// Настройка, чтобы инпут корректно подсвечивался на темном фоне
		'& .MuiInputBase-root': {
			color: '#ffffff',
			bgcolor: '#2e2e2e',
		},
		'& .MuiInputLabel-root': {
			color: '#aaa',
		},
	},
} as const;

const socket: Socket = io(import.meta.env.VITE_WS_DOMEN, {
	transports: ['websocket'],
});

function App() {
	const [currentUserId] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
	const [activeChatId, setActiveChatId] = useState<string>('1');
	const [inputText, setInputText] = useState<string>('');
	const [messages, setMessages] = useState<ISocketMessage[]>([]);

	useEffect(() => {
		setMessages([]);
		socket.emit('chat:join', activeChatId);

		const handleNewMessage = (message: ISocketMessage) => {
			if (String(message.chatId) === activeChatId) {
				setMessages((prev) => [...prev, message]);
			}
		};

		socket.on('message:new', handleNewMessage);

		return () => {
			socket.off('message:new', handleNewMessage);
		};
	}, [activeChatId]);

	const handleSendMessage = () => {
		if (!inputText.trim()) return;

		socket.emit('message:send', {
			chatId: activeChatId,
			text: inputText,
			authorId: currentUserId,
		});
		setInputText('');
	};

	return (
		<Container maxWidth="sm">
			<Box sx={styles.mainWrapper}>
				<Typography variant="subtitle2">Вы вошли как Юзер №{currentUserId}</Typography>

				<ButtonGroup variant="contained">
					<Button onClick={() => setActiveChatId('1')} disabled={activeChatId === '1'}>
						Чат 1
					</Button>
					<Button onClick={() => setActiveChatId('2')} disabled={activeChatId === '2'}>
						Чат 2
					</Button>
				</ButtonGroup>

				<Typography variant="h5" component="h1" sx={{ mt: 2 }}>
					Комната: {activeChatId === '1' ? 'Первая' : 'Вторая'}
				</Typography>

				<Box sx={styles.chatWindow}>
					{messages.map((msg, index) => (
						<Typography key={index} variant="body1">
							<strong>Юзер {msg.authorId}:</strong> {msg.text}
						</Typography>
					))}
				</Box>

				<Box sx={styles.inputForm}>
					<TextField
						fullWidth
						size="small"
						label="Сообщение..."
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
					/>
					<Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
						Отправить
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default App;

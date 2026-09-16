import { Button, Container, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:8080');

function App() {
	useEffect(() => {
		socket.on('message:new', (message) => {
			console.log('message', message);
		});
	});

	const handleSendMessage = () => {
		socket.emit('message:send', {
			chatId: new Date(),
			text: 'created message',
		});
	};
	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					mt: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Добро пожаловать в Chat!
				</Typography>

				<Typography variant="body1">Кликнули: {count} раз</Typography>

				<Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
					Отправить сообщени
				</Button>
			</Box>
		</Container>
	);
}

export default App;

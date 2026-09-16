import { Button, Container, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

function App() {
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

				<Button variant="contained" endIcon={<SendIcon />} onClick={handleIncrement}>
					Тестовая кнопка MUI
				</Button>
			</Box>
		</Container>
	);
}

export default App;

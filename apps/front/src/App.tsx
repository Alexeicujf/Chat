import { Container, Box, Typography } from '@mui/material';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
	return (
		<div
			style={{
				background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1e1b4b 100%)',
				minHeight: '100vh',
				width: '100%',
				margin: 0,
				padding: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				boxSizing: 'border-box',
			}}
		>
			<Container maxWidth="sm">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						sx={{ color: '#fff', fontWeight: 'bold', letterSpacing: '1px', textAlign: 'center' }}
					>
						Добро пожаловать в Chat!
					</Typography>

					<RegisterPage />
				</Box>
			</Container>
		</div>
	);
}

export default App;

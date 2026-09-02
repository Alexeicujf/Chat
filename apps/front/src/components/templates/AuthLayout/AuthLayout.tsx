import React from 'react';
import { Container, Box, Typography } from '@mui/material';

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
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
						{title}
					</Typography>

					{children}
				</Box>
			</Container>
		</div>
	);
};

import { Box, Typography, styled } from '@mui/material';

export const StyledRoot = styled(Box)(({ theme }) => ({
	background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1e1b4b 100%)',
	minHeight: '100vh',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	boxSizing: 'border-box',
}));

export const ContentBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '16px',
});

export const TitleTypography = styled(Typography)({
	color: '#fff',
	fontWeight: 'bold',
	letterSpacing: '1px',
	textAlign: 'center',
});

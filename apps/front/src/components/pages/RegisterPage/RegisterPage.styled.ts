import { Box, Button, styled } from '@mui/material';

export const FormContainer = styled('form')({
	width: '100%',
});

export const FormFieldsWrapper = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	width: '100%',
});

export const SubmitButton = styled(Button)({});

export const RedirectButton = styled(Button)({
	color: '#94a3b8',
	textTransform: 'none',
	marginTop: '8px',
});

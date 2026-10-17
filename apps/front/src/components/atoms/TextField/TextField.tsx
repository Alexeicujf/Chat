import { styled } from '@mui/material/styles';
import { TextField as Input } from '@mui/material';

export const TextField = styled(Input)({
	'& .MuiInputBase-input': {
		color: '#fff',
	},
	'& .MuiInputLabel-root': {
		color: '#94a3b8',
	},
	'& .MuiInputLabel-root.Mui-focused': {
		color: '#38bdf8',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: '#334155',
		},
		'&:hover fieldset': {
			borderColor: '#475569',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#38bdf8',
		},
	},
});

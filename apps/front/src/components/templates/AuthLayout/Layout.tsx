import React from 'react';
import { Container } from '@mui/material';
import { StyledRoot, ContentBox, TitleTypography } from './AuthLayout.styled';

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
	return (
		<StyledRoot>
			<Container maxWidth="sm">
				<ContentBox>
					<TitleTypography variant="h4" gutterBottom>
						{title}
					</TitleTypography>
					{children}
				</ContentBox>
			</Container>
		</StyledRoot>
	);
};

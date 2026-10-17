import { createBrowserRouter } from 'react-router';
import { RegisterPage } from '../components/pages/RegisterPage/RegisterPage';
import { LoginPage } from '../components/pages/LoginPage/LoginPage';
import { ChatPage } from '../components/pages/ChatPage/ChatPage';
import { PublicRoute } from '../providers/PublicRoute';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <PublicRoute />,
		children: [
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
		],
	},
	{
		path: '/',
		element: <ChatPage />,
	},
]);

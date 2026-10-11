import { Navigate, createBrowserRouter } from 'react-router';
import { RegisterPage } from '../components/pages/RegisterPage/RegisterPage';
import { LoginPage } from '../components/pages/LoginPage/LoginPage';
import { ChatPage } from '../components/pages/ChatPage/ChatPage';
import { AuthLayout } from '../components/templates/AuthLayout/AuthLayout';
import { PublicRoute } from '../providers/PublicRoute';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <PublicRoute />,
		children: [
			{
				path: 'register',
				element: (
					<AuthLayout title="Добро пожаловать в чат">
						<RegisterPage />
					</AuthLayout>
				),
			},
			{
				path: 'login',
				element: (
					<AuthLayout title="Вход в аккаунт">
						<LoginPage />
					</AuthLayout>
				),
			},
		],
	},
	{
		path: '/chat',
		element: <ChatPage />,
	},
	{
		path: '/',
		element: <Navigate to="/chat" replace />,
	},
	{
		path: '*',
		element: <Navigate to="/chat" replace />,
	},
]);

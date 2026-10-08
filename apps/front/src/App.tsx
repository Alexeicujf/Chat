import { Navigate, createBrowserRouter, RouterProvider } from 'react-router';
import { RegisterPage } from '@/components/pages/RegisterPage/RegisterPage.tsx';
import { LoginPage } from '@/components/pages/LoginPage/LoginPage';
import { ChatPage } from '@/components/pages/ChatPage/ChatPage';
import { AuthLayout } from '@/components/templates/AuthLayout/AuthLayout';
import { PublicRoute } from './providers/PublicRoute';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <PublicRoute />,
		children: [
			{
				path: 'register',
				element: (
					<AuthLayout title="Доьбро пожаловать в чат">
						<RegisterPage />
					</AuthLayout>
				),
			},
			{
				path: 'login',
				element: (
					<AuthLayout title="Вход в аккаунт">
						<LoginPage />,
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
		path: '/login',
		element: <Navigate to="/auth/login" replace />,
	},
	{
		path: '/',
		element: <Navigate to="/chat" replace />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

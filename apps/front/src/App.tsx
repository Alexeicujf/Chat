import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from 'react-router';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { ChatPage } from './pages/ChatPage/ChatPage.tsx';
import { AuthLayout } from './components/templates/AuthLayout/AuthLayout.tsx';
import { PublicRoute } from './providers/PublicRoute.tsx';

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
		path: '/',
		element: <Navigate to="/auth/login" replace />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { ChatPage } from './pages/ChatPage/ChatPage.tsx';
import { AuthLayout } from './components/templates/AuthLayout/AuthLayout.tsx';
import { PublicRoute } from './providers/PublicRoute.tsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<PublicRoute />}>
					<Route
						path="register"
						element={
							<AuthLayout title="Добро пожаловать в чат">
								<RegisterPage />
							</AuthLayout>
						}
					/>
					<Route
						path="login"
						element={
							<AuthLayout title="Вход в аккаунт">
								<LoginPage />
							</AuthLayout>
						}
					/>
				</Route>

				<Route path="/" element={<ChatPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

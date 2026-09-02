import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/templates/AuthLayout/AuthLayout.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/register" replace />} />
				<Route
					path="/register"
					element={
						<AuthLayout title="Добро пожаловать в чат">
							<RegisterPage />
						</AuthLayout>
					}
				/>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

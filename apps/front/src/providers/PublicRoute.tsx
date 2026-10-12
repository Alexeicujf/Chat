import { useEffect, useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router';
import { api } from '@/api/api';

export const PublicRoute = () => {
	const [isAuth, setIsAuth] = useState<boolean | null>(null);
	const isChecking = useRef(false);

	useEffect(() => {
		if (isChecking.current) return;
		isChecking.current = true;

		const checkSession = async () => {
			try {
				await api.get('/v1/user');
				setIsAuth(true);
			} catch (error) {
				setIsAuth(false);
			} finally {
				isChecking.current = false;
			}
		};
		checkSession();
	}, []);

	if (isAuth === null) {
		return <div>Проверка сессии...</div>;
	}

	if (isAuth) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

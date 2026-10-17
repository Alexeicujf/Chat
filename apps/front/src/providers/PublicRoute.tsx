import { useEffect, useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router';
import { checkUserSession } from '@/api/auth.js';
export const PublicRoute = () => {
	const [isAuth, setIsAuth] = useState<boolean | null>(null);
	const isChecking = useRef(false);

	useEffect(() => {
		if (isChecking.current) return;
		isChecking.current = true;

		const checkSession = async () => {
			try {
				await checkUserSession();
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

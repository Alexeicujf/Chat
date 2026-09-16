import { Navigate, Outlet } from 'react-router';

export const PublicRoute = () => {
	const isAuthenticated = false;

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

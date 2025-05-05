import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
	const token = localStorage.getItem('accessToken') // yoki context/api orqali

	if (!token) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

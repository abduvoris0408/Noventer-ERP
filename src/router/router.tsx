// }
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import AttendancePage from '../pages/attendance'
import ClientsPage from '../pages/clients'
import Employee from '../pages/employee'
import LoginPage from '../pages/login'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from '../pages/profile'

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: '/',
				element: <App />,
				children: [
					{
						index: true,
						element: <ProfilePage />,
					},
					{ path: '/attendance', element: <AttendancePage /> },
					{
						path: '/employee',
						element: <Employee />,
					},
					{ path: '/clients', element: <ClientsPage /> },
				],
			},
		],
	},
])

export default function AppRoutes() {
	return <RouterProvider router={router} />
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { UserProvider } from './context/UserContext'
import './index.css'
import AppRoutes from './router/router'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<AppRoutes />
		</UserProvider>
	</StrictMode>
)

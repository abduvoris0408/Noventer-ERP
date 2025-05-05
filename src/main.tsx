// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 	</StrictMode>
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 // yoki Router.tsx deb nomlang
import './index.css'
import AppRoutes from './router/router'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>
)

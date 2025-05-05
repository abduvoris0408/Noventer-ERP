// import { AppSidebar } from './components/app-sidebar'
// import { SidebarProvider } from './components/ui/sidebar'

// export default function App({ children }: { children: React.ReactNode }) {
// 	return (
// 		<SidebarProvider>
// 			<AppSidebar />
// 			<main>{children}</main>
// 		</SidebarProvider>
// 	)
// }
// import { Outlet } from 'react-router-dom'
// import { AppSidebar } from './components/app-sidebar'
// import { SidebarProvider } from './components/ui/sidebar'

// export default function App() {
// 	return (
// 		<SidebarProvider>
// 			<div className='flex'>
// 				<AppSidebar />
// 				<main className='flex-1 p-4'>
// 					<Outlet />
// 				</main>
// 			</div>
// 		</SidebarProvider>
// 	)
// }

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './components/app-sidebar'
import Footer from './components/Footer'
import { SidebarProvider } from './components/ui/sidebar'

export default function App() {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const handleSidebarToggle = (collapsed: boolean) => {
		setIsCollapsed(collapsed)
	}

	return (
		<SidebarProvider>
			<div>
				<AppSidebar onSidebarToggle={handleSidebarToggle} />
				<main
					className='flex flex-col p-4 transition-all duration-300'
					style={{
						marginLeft: isCollapsed ? '90px' : '300px',
					}}
				>
					<Outlet context={{ isCollapsed }} />
					<Footer isCollapsed={isCollapsed} />
				</main>
			</div>
		</SidebarProvider>
	)
}

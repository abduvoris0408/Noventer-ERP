import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
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
				<Toaster position='top-center' />
			</div>
		</SidebarProvider>
	)
}

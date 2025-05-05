import { Tooltip } from '@mui/material'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo, LogoDark } from '../assets'
import FullscreenToggle from './FullscreenToggle'
import NotificationPanel from './NotificationPanel'
import SearchInput from './SearchInput'
import ToggleMode from './ToggleMode'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed)
	}
	const [notifOpen, setNotifOpen] = useState(false)
	return (
		<div>
			<nav
				className={`fixed m-2 top-0 right-0 py-1 z-50 bg-sidebar border rounded-md transition-all duration-600 ease-in-out
						${isCollapsed ? 'w-[calc(100vw-90px)]' : 'w-[calc(100vw-280px)]'}`}
			>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<img
								src={Logo}
								alt='logo'
								className='hidden dark:block'
							/>
							<img
								src={LogoDark}
								alt='darklogo'
								className='block dark:hidden'
							/>
						</div>

						<div>
							<SearchInput />
						</div>

						<div className='flex items-center gap-2'>
							<Tooltip title='Sidebar' placement='bottom'>
								<div
									onClick={toggleSidebar}
									className='cursor-pointer'
								>
									<SidebarTrigger className='cursor-pointer' />
								</div>
							</Tooltip>

							<Tooltip title='To‘liq ekran' placement='bottom'>
								<div>
									<FullscreenToggle />
								</div>
							</Tooltip>

							<div>
								<ToggleMode />
							</div>

							<Tooltip
								title='Bildirishnomalar'
								placement='bottom'
							>
								<button
									onClick={() => setNotifOpen(true)}
									className='relative p-1 hover:bg-muted rounded-md cursor-pointer'
								>
									<Bell className='w-4 h-4 stroke-[1.5]' />
									<span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
								</button>
							</Tooltip>

							<Tooltip title='Profil' placement='bottom'>
								<Link to={'/'}>
									<img
										className='w-10 h-10 border rounded-full cursor-pointer'
										src='/src/assets/background-pattern.jpg'
										alt='user photo'
									/>
								</Link>
							</Tooltip>
						</div>
					</div>
				</div>

				{/* Notification Panel */}
				<NotificationPanel
					isOpen={notifOpen}
					onClose={() => setNotifOpen(false)}
				/>
			</nav>
		</div>
	)
}

export default Navbar

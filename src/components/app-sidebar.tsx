// import { Tooltip } from '@mui/material'
// import {
// 	Bell,
// 	Calendar,
// 	Facebook,
// 	Github,
// 	Home,
// 	Inbox,
// 	Instagram,
// 	Linkedin,
// 	Search,
// 	Settings,
// 	Youtube,
// } from 'lucide-react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Logo, LogoDark } from '../assets'
// import {
// 	Sidebar,
// 	SidebarContent,
// 	SidebarGroup,
// 	SidebarGroupContent,
// 	SidebarGroupLabel,
// 	SidebarMenu,
// 	SidebarMenuButton,
// 	SidebarMenuItem,
// 	SidebarTrigger,
// } from '../components/ui/sidebar'
// import FullscreenToggle from './FullscreenToggle'
// import NotificationPanel from './NotificationPanel'
// import SearchInput from './SearchInput'
// import ToggleMode from './ToggleMode'
// export function AppSidebar() {
// 	const [isCollapsed, setIsCollapsed] = useState(false)

// 	// Menu items
// 	const items = [
// 		{ title: 'Xodimlar ro`yxati', url: '#', icon: Home },
// 		{ title: 'Xodimlar davomati', url: '#', icon: Inbox },
// 		{ title: 'Mijozlar', url: '#', icon: Calendar },
// 		{ title: 'Qidiruv', url: '#', icon: Search },
// 		{ title: 'Sozlamalar', url: '#', icon: Settings },
// 	]

// 	const toggleSidebar = () => {
// 		setIsCollapsed(!isCollapsed)
// 	}
// 	const [notifOpen, setNotifOpen] = useState(false)
// 	return (
// 		<div className=' min-h-screen'>
// 			<nav
// 				className={`fixed m-2 top-0 right-0 py-1 z-50 bg-sidebar border rounded-md transition-all duration-600 ease-in-out
// 				${isCollapsed ? 'w-[calc(100vw-90px)]' : 'w-[calc(100vw-280px)]'}`}
// 			>
// 				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
// 					<div className='flex items-center justify-between'>
// 						{/* Logo */}
// 						<div className='flex items-center'>
// 							<img
// 								src={Logo}
// 								alt='logo'
// 								className='hidden dark:block'
// 							/>
// 							<img
// 								src={LogoDark}
// 								alt='darklogo'
// 								className='block dark:hidden'
// 							/>
// 						</div>

// 						{/* Search */}
// 						<div>
// 							<SearchInput />
// 						</div>

// 						{/* Icons */}
// 						<div className='flex items-center gap-2'>
// 							<Tooltip title='Sidebar' placement='bottom'>
// 								<div
// 									onClick={toggleSidebar}
// 									className='cursor-pointer'
// 								>
// 									<SidebarTrigger className='cursor-pointer' />
// 								</div>
// 							</Tooltip>

// 							<Tooltip title='To‘liq ekran' placement='bottom'>
// 								<div>
// 									<FullscreenToggle />
// 								</div>
// 							</Tooltip>

// 							<div>
// 								<ToggleMode />
// 							</div>

// 							<Tooltip
// 								title='Bildirishnomalar'
// 								placement='bottom'
// 							>
// 								<button
// 									onClick={() => setNotifOpen(true)}
// 									className='relative p-1 hover:bg-muted rounded-md cursor-pointer'
// 								>
// 									<Bell className='w-4 h-4 stroke-[1.5]' />
// 									<span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
// 								</button>
// 							</Tooltip>

// 							<Tooltip title='Profil' placement='bottom'>
// 								<img
// 									className='w-10 h-10 border rounded-full cursor-pointer'
// 									src='/api/placeholder/32/32'
// 									alt='user photo'
// 								/>
// 							</Tooltip>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Notification Panel */}
// 				<NotificationPanel
// 					isOpen={notifOpen}
// 					onClose={() => setNotifOpen(false)}
// 				/>
// 			</nav>

// 			<Sidebar
// 				className={`fixed m-2 rounded-md border border-gray-400/20 overflow-hidden  top-0 left-0 h-[calc(100vh-15px)]  transition-all  duration-300 ${
// 					isCollapsed ? 'w-16' : 'w-64'
// 				}`}
// 			>
// 				<SidebarContent>
// 					<SidebarGroup>
// 						<SidebarGroupLabel
// 							className={
// 								isCollapsed ? 'opacity-0' : 'opacity-100'
// 							}
// 						>
// 							Sahifalar
// 						</SidebarGroupLabel>
// 						<SidebarGroupContent>
// 							<SidebarMenu>
// 								{items.map(item => (
// 									<SidebarMenuItem key={item.title}>
// 										{/* <SidebarMenuButton asChild>
// 											<Link
// 												to={item.url}
// 												className='flex items-center justify-center p-2  rounded-lg hover:bg-gray-100 w-full'
// 											>
// 												<item.icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
// 												<span
// 													className={`ml-3 ${
// 														isCollapsed
// 															? 'hidden'
// 															: 'block'
// 													}`}
// 												>
// 													{item.title}
// 												</span>
// 											</Link>
// 										</SidebarMenuButton> */}
// 										<SidebarMenuButton asChild>
// 											<Link
// 												to={item.url}
// 												className={`flex items-center p-2 rounded-lg hover:bg-gray-100 w-full ${
// 													isCollapsed
// 														? 'justify-center'
// 														: ''
// 												}`}
// 											>
// 												<item.icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
// 												<span
// 													className={`ml-3 ${
// 														isCollapsed
// 															? 'hidden'
// 															: 'block'
// 													}`}
// 												>
// 													{item.title}
// 												</span>
// 											</Link>
// 										</SidebarMenuButton>
// 									</SidebarMenuItem>
// 								))}
// 							</SidebarMenu>
// 						</SidebarGroupContent>
// 					</SidebarGroup>
// 					<div
// 						className={`absolute bottom-4 left-0 w-full px-6 border-t pt-4 flex items-center gap-4 text-gray-500 ${
// 							isCollapsed ? 'hidden' : 'justify-around'
// 						}`}
// 					>
// 						<Tooltip title='Telegram' placement='top'>
// 							<a
// 								href='https://t.me/yourchannel'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<Facebook
// 									className='w-5 h-5 hover:text-blue-500 transition-all'
// 									strokeWidth={1.5}
// 								/>
// 							</a>
// 						</Tooltip>

// 						<Tooltip title='LinkedIn' placement='top'>
// 							<a
// 								href='https://linkedin.com'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<Linkedin
// 									className='w-5 h-5 hover:text-blue-500 transition-all'
// 									strokeWidth={1.5}
// 								/>
// 							</a>
// 						</Tooltip>

// 						<Tooltip title='GitHub' placement='top'>
// 							<a
// 								href='https://github.com'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<Github
// 									className='w-5 h-5 hover:text-black transition-all'
// 									strokeWidth={1.5}
// 								/>
// 							</a>
// 						</Tooltip>

// 						<Tooltip title='YouTube' placement='top'>
// 							<a
// 								href='https://youtube.com'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<Youtube
// 									className='w-5 h-5 hover:text-red-600 transition-all'
// 									strokeWidth={1.5}
// 								/>
// 							</a>
// 						</Tooltip>

// 						<Tooltip title='Instagram' placement='top'>
// 							<a
// 								href='https://instagram.com'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<Instagram
// 									className='w-5 h-5 hover:text-pink-500 transition-all'
// 									strokeWidth={1.5}
// 								/>
// 							</a>
// 						</Tooltip>
// 					</div>
// 				</SidebarContent>
// 			</Sidebar>

// 			{/* Main Content */}
// 			{/* <div
// 				className={`p-4 mt-16 ${
// 					isCollapsed ? 'ml-16' : 'ml-64'
// 				} transition-all duration-300`}
// 			>
// 				<div className='mb-4'>
// 					<h2 className='text-2xl font-bold'>Dashboard Overview</h2>
// 				</div>

// 				{isLoading ? (
// 					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 						{[1, 2, 3, 4, 5, 6].map(item => (
// 							<div key={item} className='p-4 border rounded-lg'>
// 								<Skeleton className='h-4 w-3/4 mb-2' />
// 								<Skeleton className='h-10 w-full mb-4' />
// 								<Skeleton className='h-32 w-full' />
// 							</div>
// 						))}
// 					</div>
// 				) : (
// 					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
// 						{[1, 2, 3, 4, 5, 6].map(item => (
// 							<div key={item} className='p-4 border rounded-lg'>
// 								<h3 className='font-medium mb-2'>
// 									Card Title {item}
// 								</h3>
// 								<div className='font-bold text-xl mb-4'>
// 									Summary Information
// 								</div>
// 								<div className='h-32 bg-gray-100 flex items-center justify-center'>
// 									Content Area {item}
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div> */}
// 		</div>
// 	)
// }

import { Tooltip } from '@mui/material'
import {
	Bell,
	LogOut,
	PackageCheck,
	ReceiptText,
	Search,
	Settings,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo, LogoDark } from '../assets'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '../components/ui/sidebar'
import FullscreenToggle from './FullscreenToggle'
import NotificationPanel from './NotificationPanel'
import SearchInput from './SearchInput'
import ToggleMode from './ToggleMode'
interface Props {
  onSidebarToggle?: (collapsed: boolean) => void
}
export function AppSidebar({ onSidebarToggle }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const items = [
		{ title: 'Xodimlar ro`yxati', url: '/employee', icon: ReceiptText },
		{ title: 'Xodimlar davomati', url: '/attendance', icon: PackageCheck },
		{ title: 'Mijozlar', url: '/clients', icon: Users },
		{ title: 'Qidiruv', url: '/', icon: Search },
		{ title: 'Sozlamalar', url: '/', icon: Settings },
	]

	const toggleSidebar = () => {
		const newState = !isCollapsed
		setIsCollapsed(newState)

		if (onSidebarToggle) {
			onSidebarToggle(newState)
		}
	}

	const [notifOpen, setNotifOpen] = useState(false)

	return (
		<div>
			<nav
				className={`fixed m-2 top-0 right-0 py-1 z-50 bg-sidebar border rounded-md transition-all duration-300 ease-in-out
				${isCollapsed ? 'w-[calc(100vw-100px)]' : 'w-[calc(100vw-291px)]'}`}
			>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						{/* Logo */}
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

						{/* Search */}
						<div>
							<SearchInput />
						</div>

						{/* Icons */}
						<div className='flex items-center gap-2'>
							<Tooltip title='Sidebar' placement='bottom'>
								<div
									onClick={toggleSidebar}
									className='cursor-pointer'
								>
									<SidebarTrigger className='cursor-pointer' />
								</div>
							</Tooltip>

							<Tooltip title='To`liq ekran' placement='bottom'>
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
								<img
									className='w-10 h-10 border rounded-full cursor-pointer'
									src='/api/placeholder/32/32'
									alt='user photo'
								/>
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

			<Sidebar
				className={`fixed m-2 rounded-md border border-gray-400/20 overflow-hidden top-0 left-0 h-[calc(100vh-15px)] transition-all duration-300 ${
					isCollapsed ? 'w-16' : 'w-64'
				}`}
			>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel
							className={
								isCollapsed ? 'opacity-0' : 'opacity-100'
							}
						>
							Sahifalar
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												to={item.url}
												className={`flex items-center p-2 rounded-lg hover:bg-gray-100 w-full ${
													isCollapsed
														? 'justify-center'
														: ''
												}`}
											>
												<item.icon className='w-5 h-5 text-gray-500 flex-shrink-0' />
												<span
													className={`ml-3 ${
														isCollapsed
															? 'hidden'
															: 'block'
													}`}
												>
													{item.title}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					{/* <div
						className={`absolute bottom-4 left-0 w-full px-6 border-t pt-4 flex items-center gap-4 text-gray-500 ${
							isCollapsed ? 'hidden' : 'justify-around'
						}`}
					>
						<Tooltip title='Telegram' placement='top'>
							<a
								href='https://t.me/yourchannel'
								target='_blank'
								rel='noreferrer'
							>
								<Facebook
									className='w-5 h-5 hover:text-blue-500 transition-all'
									strokeWidth={1.5}
								/>
							</a>
						</Tooltip>

						<Tooltip title='LinkedIn' placement='top'>
							<a
								href='https://linkedin.com'
								target='_blank'
								rel='noreferrer'
							>
								<Linkedin
									className='w-5 h-5 hover:text-blue-500 transition-all'
									strokeWidth={1.5}
								/>
							</a>
						</Tooltip>

						<Tooltip title='GitHub' placement='top'>
							<a
								href='https://github.com'
								target='_blank'
								rel='noreferrer'
							>
								<Github
									className='w-5 h-5 hover:text-black transition-all'
									strokeWidth={1.5}
								/>
							</a>
						</Tooltip>

						<Tooltip title='YouTube' placement='top'>
							<a
								href='https://youtube.com'
								target='_blank'
								rel='noreferrer'
							>
								<Youtube
									className='w-5 h-5 hover:text-red-600 transition-all'
									strokeWidth={1.5}
								/>
							</a>
						</Tooltip>

						<Tooltip title='Instagram' placement='top'>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noreferrer'
							>
								<Instagram
									className='w-5 h-5 hover:text-pink-500 transition-all'
									strokeWidth={1.5}
								/>
							</a>
						</Tooltip>
					</div> */}
					<div
						className={`absolute bottom-4 left-0 w-full px-6 border-t pt-3 flex items-center gap-4 ${
							isCollapsed ? 'hidden' : 'justify-center'
						}`}
					>
						<Link to={'/login'}>
							<button className='flex items-center gap-2 px-3  bg-sidebar cursor-pointer   dark:text-gray-400 rounded dark:hover:text-white  transition-colors'>
								<LogOut className='h-4 w-4' />
								<span>Sign out</span>
							</button>
						</Link>
					</div>
				</SidebarContent>
			</Sidebar>
		</div>
	)
}

import { X } from 'lucide-react'

const notifications = [
	{ id: 1, title: 'Yangi xabar', message: 'Sizda yangi buyurtma bor.' },
	{
		id: 2,
		title: 'Ogohlantirish',
		message: 'Hisobingizda kam balans mavjud.',
	},
]
interface NotificationPanelProps {
	isOpen: boolean
	onClose: () => void
}
const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
	return (
		<div
			className={`fixed top-0 right-[0] h-[calc(100vh-15px)] w-80 bg-white dark:bg-sidebar border m-2 rounded-md  shadow-lg transform transition-transform duration-300 z-50 ${
				isOpen ? 'translate-x-0' : 'translate-x-[330px]'
			}`}
		>
			<div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
				<h2 className='text-lg font-semibold'>Bildirishnomalar</h2>
				<button onClick={onClose}>
					<X className='w-5 h-5 stroke-[1.5]' />
				</button>
			</div>
			<div className='p-4 space-y-3'>
				{notifications.map(n => (
					<div key={n.id} className='p-3 bg-muted rounded-md'>
						<h3 className='font-medium'>{n.title}</h3>
						<p className='text-sm text-muted-foreground'>
							{n.message}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default NotificationPanel

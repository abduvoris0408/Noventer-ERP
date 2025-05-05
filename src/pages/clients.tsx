import { useOutletContext } from 'react-router-dom'
import { Skeleton } from '../components/ui/skeleton'
interface SidebarContextType {
	isCollapsed: boolean
}
const ClientsPage = () => {
	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}
	const skeletonRows = Array(9).fill(null)
	return (
		<div className='container mx-auto py-14 w-[100%]'>
			<div
				className='right-10 transition-all duration-300 ease-in-out py-6'
				style={{
					width: isCollapsed
						? 'calc(100% + 220px)'
						: 'calc(100% - 10px)',
				}}
			>
				<div className='flex items-center justify-between w-full gap-4 pb-4'>
					<Skeleton className='h-10 w-40' />

					<div className='flex items-center gap-2'>
						<Skeleton className='h-10 w-[180px]' />
						<Skeleton className='h-10 w-10' />
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-sidebar border-b'>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<Skeleton className='h-4 w-16' />
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<Skeleton className='h-4 w-24' />
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<Skeleton className='h-4 w-16' />
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Skeleton className='h-5 w-5 mr-2 rounded-full' />
										<Skeleton className='h-4 w-20' />
									</div>
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Skeleton className='h-5 w-5 mr-2 rounded-full' />
										<Skeleton className='h-4 w-32' />
									</div>
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Skeleton className='h-5 w-5 mr-2 rounded-full' />
										<Skeleton className='h-4 w-20' />
									</div>
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<Skeleton className='h-4 w-32' />
								</th>
								<th className='p-4 text-center font-medium text-[#525b75]'></th>
							</tr>
						</thead>
						<tbody>
							{skeletonRows.map((_, index) => (
								<tr key={index} className='border-b bg-sidebar'>
									<td className='p-4'>
										<Skeleton className='h-4 w-4 rounded' />
									</td>
									<td className='p-4'>
										<div className='flex items-center gap-3'>
											<Skeleton className='h-10 w-10 rounded-full' />
											<Skeleton className='h-4 w-32' />
										</div>
									</td>
									<td className='p-4'>
										<Skeleton className='h-4 w-20' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-4 w-32' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-4 w-28' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-4 w-24' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-4 w-24' />
									</td>
									<td className='p-4 text-center'>
										<Skeleton className='h-8 w-8 rounded-full mx-auto' />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='mt-4 flex justify-center'>
					<Skeleton className='h-10 w-[300px]' />
				</div>
			</div>
		</div>
	)
}

export default ClientsPage

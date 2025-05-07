import {
	Calendar,
	Clock,
	Eye,
	FolderInput,
	MoreHorizontal,
	Pencil,
	Phone,
	Plus,
	Trash2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Avatar } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Checkbox } from '../components/ui/checkbox'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'
import { Skeleton } from '../components/ui/skeleton'

interface SidebarContextType {
	isCollapsed: boolean
}
interface ScheduleItem {
	id: number
	smena: string
	startTime: string
	endTime: string
}
function ShiftsSkeleton() {
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

export default function ShiftsWithLoading() {
	
	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	const [loading, setLoading] = useState(false)
	const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([
		{
			id: 1,
			smena: '1-smena',
			startTime: '09:00:00',
			endTime: '18:00:00',
		},
	])

	const toggleLoading = () => {
		setLoading(!loading)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return <ShiftsSkeleton />
	}

	return (
		<div className='container mx-auto py-14 w-[100%]'>
			<div
				className='right-10 transition-all duration-300 ease-in-out py-6'
				style={{
					width: isCollapsed
						? 'calc(100% + 840px)'
						: 'calc(100% + 630px)',
				}}
			>
				<div className='flex items-center justify-between w-full gap-4 pb-4 '>
					<Button className='flex items-center gap-2 bg-[#3874ff] hover:bg-[#3874ff]/90 text-white cursor-pointer'>
						<Plus className='h-4 w-4' />
						Smena
					</Button>

					<div className='flex items-center gap-2'>
						<Select>
							<SelectTrigger className='w-[180px] bg-white text-'>
								<SelectValue placeholder='Filial tanlang' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>
									Barcha filiallar
								</SelectItem>
								<SelectItem value='tashkent'>
									Chilonzor
								</SelectItem>
								<SelectItem value='samarkand'>
									Uchtepa
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse '>
					<thead>
									<tr className='bg-gray-50 border-b'>
										<th className='text-left py-3 px-4 font-medium text-gray-700'>
											N#
										</th>
										<th className='text-left py-3 px-4 font-medium text-gray-700'>
											Smena
										</th>
										<th className='text-left py-3 px-4 font-medium text-gray-700'>
											Boshlash vaqti
										</th>
										<th className='text-left py-3 px-4 font-medium text-gray-700'>
											Tugash vaqti
										</th>
										<th className='text-right py-3 px-4 font-medium text-gray-700'></th>
									</tr>
								</thead>
								<tbody>
									{loading
										? Array.from({ length: 3 }).map(
												(_, index) => (
													<tr
														key={index}
														className='border-b'
													>
														<td className='py-3 px-4'>
															<Skeleton className='h-6 w-6' />
														</td>
														<td className='py-3 px-4'>
															<Skeleton className='h-6 w-24' />
														</td>
														<td className='py-3 px-4'>
															<Skeleton className='h-6 w-20' />
														</td>
														<td className='py-3 px-4'>
															<Skeleton className='h-6 w-20' />
														</td>
														<td className='py-3 px-4 text-right'>
															<div className='flex justify-end gap-2'>
																<Skeleton className='h-8 w-8 rounded' />
																<Skeleton className='h-8 w-8 rounded' />
															</div>
														</td>
													</tr>
												)
										  )
										: scheduleData.map((item) => (
												<tr
													key={item.id}
													className='border-b'
												>
													<td className='py-3 px-4'>
														{item.id}
													</td>
													<td className='py-3 px-4'>
														{item.smena}
													</td>
													<td className='py-3 px-4'>
														{item.startTime}
													</td>
													<td className='py-3 px-4'>
														{item.endTime}
													</td>
													<td className='py-3 px-4 text-right'>
														<div className='flex justify-end gap-2'>
															<Button
																size='icon'
																variant='ghost'
																className='h-8 w-8 bg-orange-500 hover:bg-orange-600 text-white'
															>
																<Pencil className='h-4 w-4' />
															</Button>
															<Button
																size='icon'
																variant='ghost'
																className='h-8 w-8 bg-red-500 hover:bg-red-600 text-white'
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</div>
													</td>
												</tr>
										  ))}
								</tbody>
					</table>
				</div>

				<Pagination>
					<PaginationContent className='mt-4 justify-center'>
						<PaginationItem>
							<PaginationPrevious href='#' />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#' isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href='#'>3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href='#' />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}


	

// 					<div className='border rounded-md'>
// 						<div className=''>
// 							<table className='w-full'>
// 							<thead>
// 									<tr className='bg-gray-50 border-b'>
// 										<th className='text-left py-3 px-4 font-medium text-gray-700'>
// 											N#
// 										</th>
// 										<th className='text-left py-3 px-4 font-medium text-gray-700'>
// 											Smena
// 										</th>
// 										<th className='text-left py-3 px-4 font-medium text-gray-700'>
// 											Boshlash vaqti
// 										</th>
// 										<th className='text-left py-3 px-4 font-medium text-gray-700'>
// 											Tugash vaqti
// 										</th>
// 										<th className='text-right py-3 px-4 font-medium text-gray-700'></th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{loading
// 										? Array.from({ length: 3 }).map(
// 												(_, index) => (
// 													<tr
// 														key={index}
// 														className='border-b'
// 													>
// 														<td className='py-3 px-4'>
// 															<Skeleton className='h-6 w-6' />
// 														</td>
// 														<td className='py-3 px-4'>
// 															<Skeleton className='h-6 w-24' />
// 														</td>
// 														<td className='py-3 px-4'>
// 															<Skeleton className='h-6 w-20' />
// 														</td>
// 														<td className='py-3 px-4'>
// 															<Skeleton className='h-6 w-20' />
// 														</td>
// 														<td className='py-3 px-4 text-right'>
// 															<div className='flex justify-end gap-2'>
// 																<Skeleton className='h-8 w-8 rounded' />
// 																<Skeleton className='h-8 w-8 rounded' />
// 															</div>
// 														</td>
// 													</tr>
// 												)
// 										  )
// 										: scheduleData.map(item => (
// 												<tr
// 													key={item.id}
// 													className='border-b'
// 												>
// 													<td className='py-3 px-4'>
// 														{item.id}
// 													</td>
// 													<td className='py-3 px-4'>
// 														{item.smena}
// 													</td>
// 													<td className='py-3 px-4'>
// 														{item.startTime}
// 													</td>
// 													<td className='py-3 px-4'>
// 														{item.endTime}
// 													</td>
// 													<td className='py-3 px-4 text-right'>
// 														<div className='flex justify-end gap-2'>
// 															<Button
// 																size='icon'
// 																variant='ghost'
// 																className='h-8 w-8 bg-orange-500 hover:bg-orange-600 text-white'
// 															>
// 																<Pencil className='h-4 w-4' />
// 															</Button>
// 															<Button
// 																size='icon'
// 																variant='ghost'
// 																className='h-8 w-8 bg-red-500 hover:bg-red-600 text-white'
// 															>
// 																<Trash2 className='h-4 w-4' />
// 															</Button>
// 														</div>
// 													</td>
// 												</tr>
// 										  ))}
// 								</tbody>
							// </table>
// 						</div>
// 					</div>
// 				</div> 
// }

import {
	Calendar,
	Clock,
	Eye,
	Filter,
	FolderInput,
	MoreHorizontal,
	Phone,
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
function AttendanceSkeleton() {
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

export default function AttendanceWithLoading() {
	const [loading, setLoading] = useState(true)
	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	const employees = Array(9).fill({
		name: 'Ubaydullayev Nurillo',
		role: 'Tashkent',
		phone: '+998 (90) 954-21-11',
		recruiter: 'Sheroz Turdiyev',
		shift: '01-02-2025 18:56',
		startDate: '01-02-2025 8:56',
	})

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return <AttendanceSkeleton />
	}

	return (
		<div className='container mx-auto py-14 w-[100%]'>
			<div
				className='right-10 transition-all duration-300 ease-in-out py-6'
				style={{
					width: isCollapsed
						? 'calc(100% + 320px)'
						: 'calc(100% + 80px)',
				}}
			>
				<div className='flex items-center justify-between w-full gap-4 pb-4 '>
					<Button className='flex items-center gap-2 bg-[#3874ff] hover:bg-[#3874ff]/90 text-white cursor-pointer'>
						<FolderInput className='h-4 w-4' />
						Export
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

						<Button
							variant='outline'
							size='icon'
							className='border cursor-pointer'
						>
							<Filter className='h-4 w-4 text-[#8a94ad]' />
						</Button>
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse '>
						<thead>
							<tr className='bg-sidebar border-b '>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									Check
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									F.I.SH
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									Filial
								</th>
								<th className='p-4 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Phone className='mr-2 h-5 w-5 text-[#525b75]' />
										Phone
									</div>
								</th>

								<th className='p-4 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Calendar className='mr-2 h-5 w-5 text-[#525b75]' />
										Ishga kelgan vaqti
									</div>
								</th>
								<th className='p-4 flex items-center text-left font-medium text-[#525b75]'>
									<Clock className='mr-2 h-5 w-5 text-[#525b75]' />
									Ishdan chiqqan vaqti
								</th>

								<th className='p-4 text-center font-medium text-[#525b75]'>
									{' '}
									<Eye className='cursor-pointer' />
								</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee, index) => (
								<tr
									key={index}
									className='border-b bg-sidebar '
								>
									<td className='p-4'>
										<Checkbox />
									</td>
									<td className='p-4'>
										<div className='flex items-center gap-3'>
											<Avatar className='w-10 h-10 rounded-full border border-[#cbd0dd]'>
												<img
													src='/placeholder.svg?height=40&width=40'
													alt='Avatar'
													className='rounded-full'
												/>
											</Avatar>
											<Link
												to={'/'}
												className='text-[#003cc7] font-medium hover:underline'
											>
												{employee.name}
											</Link>
										</div>
									</td>
									<td className='p-4 text-[#525b75]'>
										{employee.role}
									</td>
									<td className='p-4 text-[#525b75]'>
										{employee.phone}
									</td>

									<td className='p-4 text-[#525b75]'>
										{employee.shift}
									</td>
									<td className='p-4 text-[#525b75]'>
										{employee.startDate}
									</td>
									<td className='p-4 text-center'>
										<Button
											variant='ghost'
											size='icon'
											className='h-8 w-8 rounded-full cursor-pointer'
										>
											<MoreHorizontal className='h-4 w-4 text-[#525b75]' />
										</Button>
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

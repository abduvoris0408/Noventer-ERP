import {
	Calendar,
	Eye,
	Filter,
	MoreHorizontal,
	Phone,
	User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { EmployeeModal } from '../components/employee-modal'
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

interface UserData {
	full_name: string
	gender: string
	phone_number: string
	passport_number: string
	jshshr: string
	birth_date: string
	salary_type: string
}

interface EmployeeData {
	id: number
	user: UserData
	user_full_name: string
	user_role: string
	branch_id: number
	department_id: number
	shift_id: number
	branch_name: string
	branch_location: string
	position: string
	salary: string
	official_salary: string
	start_time: string
	end_time: string
}

interface ApiResponse {
	count: number
	next: string | null
	previous: string | null
	results: EmployeeData[]
}

interface SidebarContextType {
	isCollapsed: boolean
}

function EmployeeSkeleton() {
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

interface Branch {
	id: number
	name: string
	region: string
	district: string
	phone: string
	additional_phone: string | null
	address: string
	latitude: string | null
	longitude: string | null
	working_days: number[]
}

const branches: Branch[] = [
	{
		id: 2,
		name: 'Chilonzor filiali 1',
		region: '1',
		district: '1',
		phone: '+998912345678',
		additional_phone: '+99893952123',
		address: "Foziltepa ko'chasi, 22-B uy",
		latitude: '49.200000',
		longitude: '69.200000',
		working_days: [],
	},
	{
		id: 3,
		name: 'Yashnabod 1',
		region: 'Toshkent shahri',
		district: 'Sergeli tumani',
		phone: '+998931234567',
		additional_phone: null,
		address: 'Yashnabod tumani ,',
		latitude: '41.210000',
		longitude: '69.220000',
		working_days: [],
	},
	{
		id: 1,
		name: 'Uchtepa filiali 1',
		region: '1',
		district: '1',
		phone: '+998912345678',
		additional_phone: '+998939542122',
		address: "Foziltepa ko'chasi, 22-B uy",
		latitude: '49.200000',
		longitude: '69.200000',
		working_days: [],
	},
	{
		id: 6,
		name: 'Chilonzor filiali',
		region: 'Toshkent shahri',
		district: 'Chilonzor tumani',
		phone: '+998917654123',
		additional_phone: '+998917654123',
		address: 'Chilonzor filiali',
		latitude: null,
		longitude: null,
		working_days: [],
	},
	{
		id: 7,
		name: 'Mirobod filiali',
		region: 'Samarqand viloyati',
		district: 'Jomboy tumani',
		phone: '+998717777777',
		additional_phone: '+998717777777',
		address: "Mirobod tumani Amirobod ko'chasi",
		latitude: null,
		longitude: null,
		working_days: [],
	},
	{
		id: 8,
		name: 'Yangi',
		region: 'Toshkent shahri',
		district: 'Uchtepa tumani',
		phone: '+998939542111',
		additional_phone: null,
		address: 'dsfsfsffs',
		latitude: '41.290000',
		longitude: '69.170000',
		working_days: [],
	},
]

export default function Employee() {
	const [loading, setLoading] = useState(true)
	const [employees, setEmployees] = useState<EmployeeData[]>([])
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [selectedBranch, setSelectedBranch] = useState<string>('3') // Default to branch ID 3

	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	useEffect(() => {
		const fetchEmployees = async () => {
			setLoading(true)
			try {
				const token = localStorage.getItem('accessToken') // Tokenni olish

				if (!token) {
					throw new Error('Token not found in localStorage')
				}

				const response = await fetch(
					`https://api.noventer.uz/api/v1/employee/employees/branch/${selectedBranch}/?page=${page}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (!response.ok) {
					throw new Error(
						`API request failed with status ${response.status}`
					)
				}

				const data: ApiResponse = await response.json()
				setEmployees(data.results)

				// Calculate total pages
				const total = Math.ceil(data.count / 10)
				setTotalPages(total > 0 ? total : 1)

				setError(null)
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Unknown error occurred'
				)
				console.error('Error fetching employees:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchEmployees()
	}, [page, selectedBranch])

	const handleBranchChange = (value: string) => {
		setSelectedBranch(value)
		setPage(1)
	}

	const formatShiftTime = (start: string, end: string) => {
		return `${start} - ${end}`
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	if (loading) {
		return <EmployeeSkeleton />
	}

	if (error) {
		return (
			<div className='container mx-auto py-14 flex items-center justify-center'>
				<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
					<p>Error loading employees: {error}</p>
					<Button
						onClick={() => window.location.reload()}
						className='mt-2 bg-red-600 hover:bg-red-700 text-white'
					>
						Retry
					</Button>
				</div>
			</div>
		)
	}

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
					<EmployeeModal />

					<div className='flex items-center gap-2'>
						<Select
							value={selectedBranch}
							onValueChange={handleBranchChange}
						>
							<SelectTrigger className='w-[180px] bg-white'>
								<SelectValue placeholder='Filial tanlang' />
							</SelectTrigger>
							<SelectContent>
								{branches.map(branch => (
									<SelectItem
										key={branch.id}
										value={branch.id.toString()}
									>
										{branch.name}
									</SelectItem>
								))}
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

				{employees.length === 0 ? (
					<div className='bg-sidebar border rounded-lg p-8 w-290 flex justify-center text-center text-[#525b75]'>
						<div className='text-lg w-290'>
							Xodimlar mavjud emas
						</div>
					</div>
				) : (
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='bg-sidebar border-b'>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										Check
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										F.I.SH
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										Role
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										<div className='flex items-center'>
											<Phone className='mr-2 h-5 w-5 text-[#525b75]' />
											Phone
										</div>
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										<div className='flex items-center'>
											<User className='mr-2 h-5 w-5 text-[#525b75]' />
											Filial
										</div>
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										<div className='flex items-center'>
											<Calendar className='mr-2 h-5 w-5 text-[#525b75]' />
											Smenasi
										</div>
									</th>
									<th className='p-4 text-left font-medium text-[#525b75]'>
										Ish boshlagan sana
									</th>
									<th className='p-4 text-center font-medium text-[#525b75]'>
										<Eye className='mx-auto h-5 w-5 cursor-pointer text-[#525b75]' />
									</th>
								</tr>
							</thead>
							<tbody>
								{employees.map(employee => (
									<tr
										key={employee.id}
										className='border-b bg-sidebar'
									>
										<td className='p-4'>
											<Checkbox />
										</td>
										<td className='p-4'>
											<div className='flex items-center gap-3 w-60'>
												<Link
													to={`/employee`}
													className='text-[#003cc7] font-medium hover:underline'
												>
													{employee.user_full_name ||
														employee.user.full_name}
												</Link>
											</div>
										</td>
										<td className='p-4 text-[#525b75]'>
											{employee.user_role ||
												employee.position}
										</td>
										<td className='p-4 text-[#525b75]'>
											{employee.user.phone_number}
										</td>
										<td className='p-4 w-37 text-[#525b75]'>
											{employee.branch_name}
										</td>
										<td className='p-4 w-40 flex justify-center text-[#525b75]'>
											{formatShiftTime(
												employee.start_time,
												employee.end_time
											)}
										</td>
										<td className='p-4 text-[#525b75]'>
											{formatDate(
												employee.user.birth_date
											)}
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
				)}

				{totalPages > 0 && (
					<Pagination>
						<PaginationContent className='mt-4 justify-center'>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									onClick={e => {
										e.preventDefault()
										if (page > 1) setPage(page - 1)
									}}
									className={
										page === 1
											? 'pointer-events-none opacity-50'
											: ''
									}
								/>
							</PaginationItem>

							{Array.from(
								{ length: Math.min(totalPages, 5) },
								(_, i) => {
									const pageNumber = i + 1
									return (
										<PaginationItem key={pageNumber}>
											<PaginationLink
												href='#'
												isActive={pageNumber === page}
												onClick={e => {
													e.preventDefault()
													setPage(pageNumber)
												}}
											>
												{pageNumber}
											</PaginationLink>
										</PaginationItem>
									)
								}
							)}

							{totalPages > 5 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationNext
									href='#'
									onClick={e => {
										e.preventDefault()
										if (page < totalPages) setPage(page + 1)
									}}
									className={
										page === totalPages
											? 'pointer-events-none opacity-50'
											: ''
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}
			</div>
		</div>
	)
}

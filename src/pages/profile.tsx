import {
	Calendar,
	ChevronLeft,
	Download,
	FileText,
	Monitor,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Skeleton } from '../components/ui/skeleton'

interface SidebarContextType {
	isCollapsed: boolean
}

interface UserData {
	id: number
	full_name: string
	gender: string
	birth_date: string
	email: string
	role: string
	face_id: string | null
	company_id: number
	avatar: string | null
	salary_type: string
	phone_number: string
}

interface CompanyData {
	id: number
	name: string
	owner: number
	logo: string | null
	stir: string
	license_file: string
	created_at: string
	updated_at: string
}

export default function ProfilePage() {
	const [isLoading, setIsLoading] = useState(true)

	const [userData, setUserData] = useState<UserData | null>(null)
	const [companyData, setCompanyData] = useState<CompanyData | null>(null)

	const [taskCount, setTaskCount] = useState(0)
	const [officialSalary, setOfficialSalary] = useState(0)
	const [unofficialSalary, setUnofficialSalary] = useState(0)

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem('accessToken')
			try {
				const response = await fetch(
					'https://api.noventer.uz/api/v1/accounts/me/',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (!response.ok) {
					throw new Error(`API request failed: ${response.status}`)
				}

				const data: UserData = await response.json()
				setUserData(data)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		const fetchCompanyData = async () => {
			const token = localStorage.getItem('accessToken')
			try {
				const response = await fetch(
					'https://api.noventer.uz/api/v1/company/get/',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				)

				if (!response.ok) {
					throw new Error(`API request failed: ${response.status}`)
				}
				console.log(response)

				const data: CompanyData = await response.json()
				setCompanyData(data)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching company data:', error)
				setIsLoading(false)
			}
		}

		fetchUserData().then(() => fetchCompanyData())
	}, [])

	useEffect(() => {
		if (!isLoading) {
			const steps = 50
			const duration = 2000
			const interval = duration / steps
			let currentStep = 0

			const animate = setInterval(() => {
				currentStep++
				setTaskCount(
					Math.min(Math.round((12 / steps) * currentStep), 12)
				)
				setOfficialSalary(
					Math.min(Math.round((557000 / steps) * currentStep), 557000)
				)
				setUnofficialSalary(
					Math.min(Math.round((650000 / steps) * currentStep), 650000)
				)

				if (currentStep >= steps) clearInterval(animate)
			}, interval)

			return () => clearInterval(animate)
		}
	}, [isLoading])

	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A'
		const date = new Date(dateString)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const formatGender = (gender: string) => {
		if (!gender) return 'N/A'
		return gender === 'male' ? 'Erkak' : 'Ayol'
	}

	if (isLoading) {
		return (
			<div className='container mx-auto py-14 w-[100%]'>
				<div
					className='right-10 transition-all duration-300 ease-in-out py-6'
					style={{
						width: isCollapsed
							? 'calc(100% + 650px)'
							: 'calc(100% + 430px)',
					}}
				>
					<div className='flex items-center border-b'>
						<div className='p-5'>
							<Skeleton className='h-5 w-5 rounded-full' />
						</div>
						<div className='flex flex-1 gap-4'>
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
						</div>
					</div>

					<div className='my-2'>
						<Skeleton className='h-48 w-full rounded-2xl' />
					</div>

					<div className='mt-10'>
						<div className='flex justify-between px-24 gap-10 mb-8'>
							{[1, 2, 3].map((_, index) => (
								<div key={index} className='text-center w-full'>
									<Skeleton className='h-6 w-6 mx-auto mb-2 rounded-full' />
									<Skeleton className='h-4 w-24 mx-auto mb-2' />
									<Skeleton className='h-8 w-16 mx-auto mb-2' />
									<Skeleton className='h-3 w-32 mx-auto' />
								</div>
							))}
						</div>
					</div>

					<div className='px-24 mb-8'>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-5 w-5 rounded-full' />
								<Skeleton className='h-6 w-32' />
							</div>
							<Skeleton className='h-9 w-28' />
						</div>

						<div className='grid grid-cols-2 gap-y-4 gap-x-6'>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
								<div key={index}>
									<Skeleton className='h-4 w-32 mb-2' />
									<Skeleton className='h-9 w-full' />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto py-14  w-[100%]'>
			<div
				className='right-10 transition-all duration-300 ease-in-out py-6'
				style={{
					width: isCollapsed
						? 'calc(100% + 650px)'
						: 'calc(100% + 430px)',
				}}
			>
				<div className='flex items-center border-b'>
					<Link to='#' className='p-5'>
						<ChevronLeft className='h-5 w-5 text-[#707683]' />
					</Link>
					<div className='flex flex-1'>
						<Link
							to='#'
							className='px-4 py-2 text-[#005eeb] font-medium border-b-2 border-[#005eeb]'
						>
							Profile
						</Link>
					</div>
				</div>

				<div className='my-2'>
					<div className='bg-gradient-to-r from-[#005eeb] to-[#00a5ff] p-6 pb-12 rounded-2xl relative overflow-hidden'>
						<div className='absolute right-0 top-0 w-full h-full opacity-20'>
							<img
								src='/src/assets/background-pattern.jpg'
								alt='Background pattern'
								className='object-cover w-full'
							/>
						</div>

						<div className='flex items-start gap-4  relative z-10'>
							<div className='relative'>
								{userData?.avatar ? (
									<div className='bg-white rounded-full w-24 h-24 flex items-center justify-center overflow-hidden'>
										<img
											src={userData.avatar}
											alt={userData.full_name}
											className='w-full h-full object-cover'
										/>
									</div>
								) : (
									<div className='bg-white rounded-full w-24 h-24 flex items-center justify-center text-[#005eeb] text-5xl font-bold overflow-hidden'>
										{userData?.full_name.charAt(0)}
									</div>
								)}
							</div>

							<div className='text-white'>
								<p className='text-sm opacity-90'>
									Xush kelibsiz!
								</p>
								<h1 className='text-3xl font-bold mb-1'>
									{userData?.full_name || 'Foydalanuvchi'}
								</h1>
								<span className='bg-white/20 text-white px-3 py-1 rounded-full text-sm'>
									{userData?.role === 'director'
										? 'Rahbar'
										: userData?.role}
								</span>
							</div>

							<div className='ml-auto'>
								<div className='bg-white/20 backdrop-blur-md rounded-lg p-4 text-white w-80'>
									<p className='text-sm mb-1'>Finance card</p>
									<p className='text-xs mb-3 opacity-80'>
										ID: {userData?.id || '0'}
									</p>

									<p className='text-sm mb-1'>
										Current balance:
									</p>
									<p className='text-2xl font-bold'>
										557 000 so'm
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-10'>
					<div className='flex justify-between px-24 gap-10 mb-8'>
						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<Monitor className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>Vazifalar</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{taskCount}
							</p>
							<p className='text-xs text-[#90a0b7]'>
								Group and individual
							</p>
						</div>

						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<FileText className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>
								Rasmiy oylik
							</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{officialSalary.toLocaleString()}{' '}
								<span className='text-sm font-normal'>
									so'm
								</span>
							</p>
							<p className='text-xs text-[#90a0b7]'>
								1 218 000 so'm
							</p>
						</div>

						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<Calendar className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>
								Norasmiy oylik
							</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{unofficialSalary.toLocaleString()}{' '}
								<span className='text-sm font-normal'>
									so'm
								</span>
							</p>
							<p className='text-xs text-[#90a0b7]'>
								1 218 000 so'm
							</p>
						</div>
					</div>
				</div>

				<div className='px-24 mb-8'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center'>
							<FileText className='h-5 w-5 text-[#90a0b7] mr-2' />
							<h2 className='text-[#334d6e] font-medium'>
								Malumotlar
							</h2>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-y-4 gap-x-6'>
						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Telefon raqam:
							</p>
							<p className='text-[#334d6e]'>
								{userData?.phone_number || 'no data'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Kompaniya nomi:
							</p>
							<p className='text-[#334d6e]'>
								{companyData?.name || 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Email:
							</p>
							<p className='text-[#334d6e]'>
								{userData?.email || 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>INN:</p>
							<p className='text-[#334d6e]'>
								{companyData?.stir || 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Birthday:
							</p>
							<p className='text-[#334d6e]'>
								{userData?.birth_date
									? formatDate(userData.birth_date)
									: 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Ro'yxatdan o'tgan sana:
							</p>
							<p className='text-[#334d6e]'>
								{companyData?.created_at
									? formatDate(companyData.created_at)
									: 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Gender:
							</p>
							<p className='text-[#334d6e]'>
								{userData?.gender
									? formatGender(userData.gender)
									: 'Mavjud emas'}
							</p>
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Lizensiya:
							</p>
							{companyData?.license_file ? (
								<Button
									variant='outline'
									size='sm'
									className='mt-1 border-[#90a0b7] text-[#334d6e] hover:bg-[#f1f4f8] hover:text-[#005eeb] transition-colors flex items-center gap-1.5'
									onClick={() =>
										window.open(
											companyData.license_file,
											'_blank'
										)
									}
								>
									<Download className='h-4 w-4' />
									Yuklab olish
								</Button>
							) : (
								<p className='text-[#334d6e]'>Mavjud emas</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

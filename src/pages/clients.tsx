'use client'

import type React from 'react'

import {
	Calendar,
	Compass,
	Eye,
	MoreHorizontal,
	Phone,
	Plus,
	Search,
	Upload,
	User,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Checkbox } from '../components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
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

interface ClientData {
	id: number
	branch: number
	branch_name: string
	name: string
	phone: string
	avatar: string
	license_file: string
	created_at: string
	updated_at: string
}

interface ApiResponse {
	count: number
	next: string | null
	previous: string | null
	results: ClientData[]
}

interface SidebarContextType {
	isCollapsed: boolean
}

interface NewClientData {
	name: string
	phone: string
	branch: number | null
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
	working_days: string[]
}

function ClientsSkeleton() {
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

export default function ClientsPage() {
	const [loading, setLoading] = useState(true)
	const [clients, setClients] = useState<ClientData[]>([])
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [newClient, setNewClient] = useState<NewClientData>({
		name: '',
		phone: '',
		branch: null,
	})
	const [branches] = useState<Branch[]>([
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
	])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [licenseFile, setLicenseFile] = useState<File | null>(null)
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
	const [licensePreview, setLicensePreview] = useState<string | null>(null)

	const avatarInputRef = useRef<HTMLInputElement>(null)
	const licenseInputRef = useRef<HTMLInputElement>(null)

	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	const fetchClients = async () => {
		setLoading(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				throw new Error('Token not found in localStorage')
			}

			const response = await fetch(
				`https://api.noventer.uz/api/v1/company/clients/?page=${page}${
					searchQuery ? `&search=${searchQuery}` : ''
				}`,
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
			setClients(data.results)

			const total = Math.ceil(data.count / 10)
			setTotalPages(total > 0 ? total : 1)

			setError(null)
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Unknown error occurred'
			)
			console.error('Error fetching clients:', err)
			console.log(
				'error',
				'Xatolik',
				'Mijozlarni yuklashda xatolik yuz berdi'
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchClients()
	}, [page, searchQuery])

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setAvatarFile(file)

			const reader = new FileReader()
			reader.onload = event => {
				setAvatarPreview(event.target?.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setLicenseFile(file)

			if (file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onload = event => {
					setLicensePreview(event.target?.result as string)
				}
				reader.readAsDataURL(file)
			} else {
				setLicensePreview(null)
			}
		}
	}

	const handleAddClient = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!newClient.branch) {
			console.log('warning', 'Xatolik', 'Iltimos, filial tanlang')
			return
		}

		if (!avatarFile) {
			console.log('warning', 'Xatolik', 'Iltimos, mijoz rasmini yuklang')
			return
		}

		if (!licenseFile) {
			console.log(
				'warning',
				'Xatolik',
				'Iltimos, litsenziya faylini yuklang'
			)
			return
		}

		setIsSubmitting(true)

		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				throw new Error('Token not found in localStorage')
			}

			const formData = new FormData()
			formData.append('name', newClient.name)
			formData.append('phone', newClient.phone)
			formData.append('branch', newClient.branch.toString())
			formData.append('avatar', avatarFile)
			formData.append('license_file', licenseFile)

			const response = await fetch(
				'https://api.noventer.uz/api/v1/company/clients/',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formData,
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(
					errorData.message ||
						`Request failed with status ${response.status}`
				)
			}

			console.log(
				'success',
				'Muvaffaqiyatli',
				"Mijoz muvaffaqiyatli qo'shildi"
			)

			setNewClient({
				name: '',
				phone: '',
				branch: null,
			})
			setAvatarFile(null)
			setLicenseFile(null)
			setAvatarPreview(null)
			setLicensePreview(null)
			setIsAddModalOpen(false)

			fetchClients()
		} catch (err) {
			console.log(
				'error',
				'Xatolik yuz berdi',
				err instanceof Error ? err.message : "Noma'lum xatolik"
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		setPage(1)
		fetchClients()
	}

	if (loading && clients.length === 0) {
		return <ClientsSkeleton />
	}

	if (error && clients.length === 0) {
		return (
			<div className='container mx-auto py-14 flex items-center justify-center'>
				<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
					<p>Error loading clients: {error}</p>
					<Button
						onClick={() => fetchClients()}
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
				<div className='flex justify-between items-center mb-4'>
					<Button
						className='my-1 flex items-center gap-2'
						onClick={() => setIsAddModalOpen(true)}
					>
						<Plus className='h-4 w-4' /> Mijoz qo`shish
					</Button>

					<form onSubmit={handleSearch} className='flex gap-2'>
						<div className='relative'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Mijozlarni qidirish...'
								className='pl-8 w-[250px]'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
						</div>
					</form>
				</div>

				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-sidebar border-b'>
								<th className='p-4  text-left font-medium text-[#525b75]'>
									<Checkbox />
								</th>
								<th className='p-4 w-50 text-left font-medium text-[#525b75]'>
									Mijoz
								</th>
								<th className='p-4 text-center w-50 font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Phone className='mr-2 h-5 w-5 text-[#525b75]' />
										Telefon
									</div>
								</th>
								<th className='p-4 text-center w-50 font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Compass className='mr-2 h-5 w-5 text-[#525b75]' />
										Filial
									</div>
								</th>
								<th className='p-4 w-50 text-left font-medium text-[#525b75]'>
									<div className='flex items-center'>
										<Calendar className='mr-2 h-5 w-5 text-[#525b75]' />
										Litsenziya
									</div>
								</th>
								<th className='p-4 text-left w-50 font-medium text-[#525b75]'>
									Yaratilgan vaqti
								</th>
								<th className='p-4 text-center font-medium text-[#525b75]'>
									<Eye className='mx-auto h-5 w-5 cursor-pointer text-[#525b75]' />
								</th>
							</tr>
						</thead>
						<tbody>
							{clients.length > 0 ? (
								clients.map(client => (
									<tr
										key={client.id}
										className='border-b bg-sidebar'
									>
										<td className='p-4'>
											<Checkbox />
										</td>
										<td className='p-4'>
											<div className='flex items-center gap-3'>
												{client.avatar ? (
													<img
														src={
															client.avatar ||
															'/placeholder.svg'
														}
														alt={client.name}
														className='h-10 w-10 rounded-full object-cover'
													/>
												) : (
													<div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
														<User className='h-6 w-6 text-gray-500' />
													</div>
												)}
												<Link
													to={`/clients/${client.id}`}
													className='text-[#003cc7] font-medium hover:underline'
												>
													{client.name}
												</Link>
											</div>
										</td>
										<td className='p-4 text-[#525b75]'>
											{client.phone}
										</td>
										<td className='p-4 text-[#525b75]'>
											{client.branch_name}
										</td>
										<td className='p-4 text-[#525b75]'>
											{client.license_file ? (
												<a
													href={client.license_file}
													target='_blank'
													rel='noopener noreferrer'
													className='text-[#003cc7] hover:underline flex items-center gap-1'
												>
													<Eye className='h-4 w-4' />{' '}
													Ko'rish
												</a>
											) : (
												'Mavjud emas'
											)}
										</td>
										<td className='p-4 text-[#525b75]'>
											{formatDate(client.created_at)}
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
								))
							) : (
								<tr>
									<td
										colSpan={7}
										className='text-center py-8 text-[#525b75]'
									>
										Mijozlar topilmadi
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

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

			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle className='flex items-center gap-2'>
							<User className='h-5 w-5' /> Yangi mijoz qo'shish
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleAddClient}>
						<div className='grid gap-4 py-4'>
							<div className='grid gap-2'>
								<Label htmlFor='name'>Mijoz ismi</Label>
								<Input
									id='name'
									value={newClient.name}
									onChange={e =>
										setNewClient({
											...newClient,
											name: e.target.value,
										})
									}
									placeholder='Mijoz ismi'
									required
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='phone'>Telefon raqami</Label>
								<Input
									id='phone'
									value={newClient.phone}
									onChange={e =>
										setNewClient({
											...newClient,
											phone: e.target.value,
										})
									}
									placeholder='+998 XX XXX XX XX'
									required
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='branch'>Filial</Label>
								<Select
									onValueChange={value =>
										setNewClient({
											...newClient,
											branch: Number.parseInt(value),
										})
									}
									value={newClient.branch?.toString() || ''}
								>
									<SelectTrigger>
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
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='avatar'>Mijoz rasmi</Label>
								<div className='flex items-center gap-4'>
									<div
										className='h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary'
										onClick={() =>
											avatarInputRef.current?.click()
										}
									>
										{avatarPreview ? (
											<img
												src={
													avatarPreview ||
													'/placeholder.svg'
												}
												alt='Avatar preview'
												className='h-full w-full object-cover rounded-lg'
											/>
										) : (
											<>
												<Upload className='h-6 w-6 text-gray-400' />
												<span className='text-xs text-gray-500 mt-1'>
													Rasm yuklash
												</span>
											</>
										)}
									</div>
									<input
										ref={avatarInputRef}
										type='file'
										id='avatar'
										accept='image/*'
										className='hidden'
										onChange={handleAvatarChange}
									/>
									<div className='text-sm text-gray-500'>
										<p>Rasm yuklang</p>
										<p>Maksimal hajm: 5MB</p>
										<p>Formatlar: JPG, PNG</p>
									</div>
								</div>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='license_file'>
									Litsenziya fayli
								</Label>
								<div className='flex items-center gap-4'>
									<div
										className='h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary'
										onClick={() =>
											licenseInputRef.current?.click()
										}
									>
										{licensePreview ? (
											<img
												src={
													licensePreview ||
													'/placeholder.svg'
												}
												alt='License preview'
												className='h-full w-full object-cover rounded-lg'
											/>
										) : (
											<>
												<Upload className='h-6 w-6 text-gray-400' />
												<span className='text-xs text-gray-500 mt-1'>
													Fayl yuklash
												</span>
											</>
										)}
									</div>
									<input
										ref={licenseInputRef}
										type='file'
										id='license_file'
										accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
										className='hidden'
										onChange={handleLicenseChange}
									/>
									<div className='text-sm text-gray-500'>
										{licenseFile && !licensePreview ? (
											<p className='font-medium'>
												{licenseFile.name}
											</p>
										) : (
											<>
												<p>
													Litsenziya faylini yuklang
												</p>
												<p>Maksimal hajm: 10MB</p>
												<p>
													Formatlar: PDF, JPG, PNG,
													DOC
												</p>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button
								type='button'
								variant='outline'
								onClick={() => setIsAddModalOpen(false)}
								disabled={isSubmitting}
							>
								Bekor qilish
							</Button>
							<Button type='submit' disabled={isSubmitting}>
								{isSubmitting ? (
									<div className='flex items-center gap-2'>
										<div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
										Saqlanmoqda...
									</div>
								) : (
									'Saqlash'
								)}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

'use client'

import type React from 'react'

import { Eye, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'sonner'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../components/ui/alert-dialog'
import { Button } from '../components/ui/button'
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

interface SidebarContextType {
	isCollapsed: boolean
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

interface Shift {
	id: number
	name: string
	branch: number
	start_time: string
	end_time: string
}

export default function ShiftsPage() {
	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	const [loading, setLoading] = useState(true)
	const [shifts, setShifts] = useState<Shift[]>([])
	const [selectedBranch, setSelectedBranch] = useState<string>('')
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [deleteShiftId, setDeleteShiftId] = useState<number | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		branch: '',
		start_time: '',
		end_time: '',
	})

	const [formErrors, setFormErrors] = useState({
		name: '',
		branch: '',
		start_time: '',
		end_time: '',
	})

	const [editingShift, setEditingShift] = useState<Shift | null>(null)
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

	useEffect(() => {
		fetchShifts()
	}, [selectedBranch, currentPage])

	const fetchShifts = async () => {
		setLoading(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				toast.error("Avtorizatsiyadan o'tilmagan")
				setLoading(false)
				return
			}

			if (!selectedBranch) {
				setShifts([])
				setLoading(false)
				return
			}

			const endpoint = `https://api.noventer.uz/api/v1/company/shifts/${selectedBranch}/`

			const response = await fetch(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error('Shifts data could not be fetched')
			}

			const data = await response.json()

			setShifts(data || [])
			setTotalPages(Math.max(1, Math.ceil((data?.length || 0) / 10)))
			setLoading(false)
		} catch (error) {
			console.error('Error fetching shifts:', error)
			toast.error("Smenalar ma'lumotlarini olishda xatolik yuz berdi")
			setLoading(false)
		}
	}

	const validateForm = () => {
		const errors = {
			name: '',
			branch: '',
			start_time: '',
			end_time: '',
		}

		let isValid = true

		if (!formData.name.trim()) {
			errors.name = 'Smena nomi kiritilishi shart'
			isValid = false
		}

		if (!formData.branch) {
			errors.branch = 'Filial tanlanishi shart'
			isValid = false
		}

		if (!formData.start_time) {
			errors.start_time = 'Boshlash vaqti kiritilishi shart'
			isValid = false
		}

		if (!formData.end_time) {
			errors.end_time = 'Tugash vaqti kiritilishi shart'
			isValid = false
		}

		setFormErrors(errors)
		return isValid
	}

	const handleCreateShift = async () => {
		if (!validateForm()) {
			return
		}

		setLoading(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				toast.error("Avtorizatsiyadan o'tilmagan")
				setLoading(false)
				return
			}

			const response = await fetch(
				'https://api.noventer.uz/api/v1/company/shift-create/',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formData.name,
						branch: Number.parseInt(formData.branch),
						start_time: formData.start_time,
						end_time: formData.end_time,
					}),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to create shift')
			}

			// Get the actual data from the response
			const data = await response.json()

			// Add the new shift to the list if it matches the current filter
			if (
				!selectedBranch ||
				Number.parseInt(formData.branch) ===
					Number.parseInt(selectedBranch)
			) {
				setShifts(prev => [...prev, data])
			}

			toast.success('Smena muvaffaqiyatli yaratildi')
			setIsCreateDialogOpen(false)
			resetForm()
			setLoading(false)

			// Refresh the list to ensure we have the latest data
			if (selectedBranch) {
				fetchShifts()
			}
		} catch (error) {
			console.error('Error creating shift:', error)
			toast.error('Smena yaratishda xatolik yuz berdi')
			setLoading(false)
		}
	}

	const handleUpdateShift = async () => {
		if (!editingShift || !validateForm()) {
			return
		}

		setLoading(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				toast.error("Avtorizatsiyadan o'tilmagan")
				setLoading(false)
				return
			}

			const response = await fetch(
				`https://api.noventer.uz/api/v1/company/shift-detail/${editingShift.id}/`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: formData.name,
						branch: Number.parseInt(formData.branch),
						start_time: formData.start_time,
						end_time: formData.end_time,
					}),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to update shift')
			}

			// Get the actual updated data
			const updatedShift = await response.json()

			// Update the shift in the list if it's still visible with current filter
			if (
				!selectedBranch ||
				Number.parseInt(formData.branch) ===
					Number.parseInt(selectedBranch)
			) {
				setShifts(prev =>
					prev.map(shift =>
						shift.id === editingShift.id ? updatedShift : shift
					)
				)
			} else {
				// If the branch was changed and no longer matches the filter, remove it from the list
				setShifts(prev =>
					prev.filter(shift => shift.id !== editingShift.id)
				)
			}

			toast.success('Smena muvaffaqiyatli yangilandi')
			setIsEditDialogOpen(false)
			setEditingShift(null)
			resetForm()
			setLoading(false)

			// Refresh the list to ensure we have the latest data
			if (selectedBranch) {
				fetchShifts()
			}
		} catch (error) {
			console.error('Error updating shift:', error)
			toast.error('Smena yangilashda xatolik yuz berdi')
			setLoading(false)
		}
	}

	const handleDeleteShift = async () => {
		if (!deleteShiftId) return

		setLoading(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				toast.error("Avtorizatsiyadan o'tilmagan")
				setLoading(false)
				return
			}

			const response = await fetch(
				`https://api.noventer.uz/api/v1/company/shift-detail/${deleteShiftId}/`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete shift')
			}

			// Remove shift from the list immediately after successful deletion
			setShifts(prev => prev.filter(shift => shift.id !== deleteShiftId))
			toast.success("Smena muvaffaqiyatli o'chirildi")
			setIsDeleteDialogOpen(false)
			setDeleteShiftId(null)
			setLoading(false)
		} catch (error) {
			console.error('Error deleting shift:', error)
			toast.error("Smena o'chirishda xatolik yuz berdi")
			setLoading(false)
		}
	}

	const openEditDialog = (shift: Shift) => {
		setEditingShift(shift)
		setFormData({
			name: shift.name,
			branch: shift.branch.toString(),
			start_time: shift.start_time,
			end_time: shift.end_time,
		})
		setFormErrors({
			name: '',
			branch: '',
			start_time: '',
			end_time: '',
		})
		setIsEditDialogOpen(true)
	}

	const confirmDelete = (id: number) => {
		setDeleteShiftId(id)
		setIsDeleteDialogOpen(true)
	}

	const resetForm = () => {
		setFormData({
			name: '',
			branch: '',
			start_time: '',
			end_time: '',
		})
		setFormErrors({
			name: '',
			branch: '',
			start_time: '',
			end_time: '',
		})
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))

		// Clear error when user types
		if (formErrors[name as keyof typeof formErrors]) {
			setFormErrors(prev => ({
				...prev,
				[name]: '',
			}))
		}
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))

		if (formErrors[name as keyof typeof formErrors]) {
			setFormErrors(prev => ({
				...prev,
				[name]: '',
			}))
		}
	}

	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return
		setCurrentPage(page)
	}

	const openCreateDialog = () => {
		resetForm()
		setIsCreateDialogOpen(true)
	}

	if (loading && shifts.length === 0) {
		return <ShiftsSkeleton isCollapsed={isCollapsed} />
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
					<Button
						className='flex items-center gap-2 bg-[#3874ff] hover:bg-[#3874ff]/90 text-white cursor-pointer'
						onClick={openCreateDialog}
					>
						<Plus className='h-4 w-4' />
						Smena
					</Button>

					<div className='flex items-center gap-2'>
						<Select
							value={selectedBranch}
							onValueChange={value => setSelectedBranch(value)}
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
					</div>
				</div>

				<div className='overflow-x-auto bg-sidebar rounded-md shadow'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-sidebar text-center border-b'>
								<th className=' w-20 text-center py-3 px-4 font-medium text-gray-700'>
									N#
								</th>
								<th className='text-center w-50 py-3 px-4 font-medium text-gray-700'>
									Smena
								</th>
								<th className='text-center w-50 py-3 px-4 font-medium text-gray-700'>
									Filial
								</th>
								<th className='text-center w-70 py-3 px-4 font-medium text-gray-700'>
									Boshlash vaqti
								</th>
								<th className='text-center w-70 py-3 px-4 font-medium text-gray-700'>
									Tugash vaqti
								</th>
								<th className='text-center w-30 py-3 px-4 font-medium text-gray-700'>
									<Eye className='cursor-pointer ' />
								</th>
							</tr>
						</thead>
						<tbody>
							{!selectedBranch ? (
								<tr>
									<td
										colSpan={6}
										className='py-8 text-center text-gray-500'
									>
										Iltimos, filial tanlang
									</td>
								</tr>
							) : shifts.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										className='py-8 text-center text-gray-500'
									>
										Smenalar topilmadi
									</td>
								</tr>
							) : (
								shifts.map((shift, index) => (
									<tr
										key={shift.id}
										className='border-b text-center cursor-pointer'
									>
										<td className='py-3 px-4'>
											{(currentPage - 1) * 10 + index + 1}
										</td>
										<td className='py-3 px-4'>
											{shift.name}
										</td>
										<td className='py-3 px-4'>
											{branches.find(
												b => b.id === shift.branch
											)?.name || 'Unknown'}
										</td>
										<td className='py-3 px-4'>
											{shift.start_time}
										</td>
										<td className='py-3 px-4'>
											{shift.end_time}
										</td>
										<td className='py-3 px-4 text-right'>
											<div className='flex justify-end gap-2'>
												<Button
													size='icon'
													variant='ghost'
													className='h-8 w-8 bg-orange-500 hover:bg-orange-600 text-white'
													onClick={() =>
														openEditDialog(shift)
													}
												>
													<Pencil className='h-4 w-4' />
												</Button>
												<Button
													size='icon'
													variant='ghost'
													className='h-8 w-8 bg-red-500 hover:bg-red-600 text-white'
													onClick={() =>
														confirmDelete(shift.id)
													}
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{totalPages > 1 && (
					<Pagination>
						<PaginationContent className='mt-4 justify-center'>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => goToPage(currentPage - 1)}
									className={
										currentPage === 1
											? 'pointer-events-none opacity-50'
											: 'cursor-pointer'
									}
								/>
							</PaginationItem>

							{Array.from(
								{ length: Math.min(5, totalPages) },
								(_, i) => {
									let pageNum = i + 1
									if (totalPages > 5 && currentPage > 3) {
										pageNum = currentPage - 3 + i
										if (pageNum > totalPages) {
											pageNum = totalPages - (4 - i)
										}
									}

									return (
										<PaginationItem key={i}>
											<PaginationLink
												onClick={() =>
													goToPage(pageNum)
												}
												isActive={
													currentPage === pageNum
												}
												className='cursor-pointer'
											>
												{pageNum}
											</PaginationLink>
										</PaginationItem>
									)
								}
							)}

							{totalPages > 5 && currentPage < totalPages - 2 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationNext
									onClick={() => goToPage(currentPage + 1)}
									className={
										currentPage === totalPages
											? 'pointer-events-none opacity-50'
											: 'cursor-pointer'
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}

				{/* Create Shift Dialog */}
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle className='flex justify-between items-center'>
								<span>Yangi smena qo'shish</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-6 w-6 rounded-full'
									onClick={() => setIsCreateDialogOpen(false)}
								>
									<X className='h-4 w-4' />
								</Button>
							</DialogTitle>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='name' className='text-right'>
									Nomi <span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='name'
										name='name'
										value={formData.name}
										onChange={handleInputChange}
										className={
											formErrors.name
												? 'border-red-500'
												: ''
										}
										placeholder='1-smena'
									/>
									{formErrors.name && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.name}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='branch' className='text-right'>
									Filial{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Select
										value={formData.branch}
										onValueChange={value =>
											handleSelectChange('branch', value)
										}
									>
										<SelectTrigger
											className={
												formErrors.branch
													? 'border-red-500'
													: ''
											}
										>
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
									{formErrors.branch && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.branch}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='start_time'
									className='text-right'
								>
									Boshlash vaqti{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='start_time'
										name='start_time'
										type='time'
										value={formData.start_time}
										onChange={handleInputChange}
										className={
											formErrors.start_time
												? 'border-red-500'
												: ''
										}
									/>
									{formErrors.start_time && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.start_time}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='end_time'
									className='text-right'
								>
									Tugash vaqti{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='end_time'
										name='end_time'
										type='time'
										value={formData.end_time}
										onChange={handleInputChange}
										className={
											formErrors.end_time
												? 'border-red-500'
												: ''
										}
									/>
									{formErrors.end_time && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.end_time}
										</p>
									)}
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant='outline'
								onClick={() => setIsCreateDialogOpen(false)}
							>
								Bekor qilish
							</Button>
							<Button
								onClick={handleCreateShift}
								disabled={loading}
							>
								{loading ? 'Saqlanmoqda...' : 'Saqlash'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Dialog
					open={isEditDialogOpen}
					onOpenChange={setIsEditDialogOpen}
				>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle className='flex justify-between items-center'>
								<span>Smenani tahrirlash</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-6 w-6 rounded-full'
									onClick={() => setIsEditDialogOpen(false)}
								>
									<X className='h-4 w-4' />
								</Button>
							</DialogTitle>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='edit-name'
									className='text-right'
								>
									Nomi <span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='edit-name'
										name='name'
										value={formData.name}
										onChange={handleInputChange}
										className={
											formErrors.name
												? 'border-red-500'
												: ''
										}
									/>
									{formErrors.name && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.name}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='edit-branch'
									className='text-right'
								>
									Filial{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Select
										value={formData.branch}
										onValueChange={value =>
											handleSelectChange('branch', value)
										}
									>
										<SelectTrigger
											className={
												formErrors.branch
													? 'border-red-500'
													: ''
											}
										>
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
									{formErrors.branch && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.branch}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='edit-start_time'
									className='text-right'
								>
									Boshlash vaqti{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='edit-start_time'
										name='start_time'
										type='time'
										value={formData.start_time}
										onChange={handleInputChange}
										className={
											formErrors.start_time
												? 'border-red-500'
												: ''
										}
									/>
									{formErrors.start_time && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.start_time}
										</p>
									)}
								</div>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label
									htmlFor='edit-end_time'
									className='text-right'
								>
									Tugash vaqti{' '}
									<span className='text-red-500'>*</span>
								</Label>
								<div className='col-span-3'>
									<Input
										id='edit-end_time'
										name='end_time'
										type='time'
										value={formData.end_time}
										onChange={handleInputChange}
										className={
											formErrors.end_time
												? 'border-red-500'
												: ''
										}
									/>
									{formErrors.end_time && (
										<p className='text-red-500 text-sm mt-1'>
											{formErrors.end_time}
										</p>
									)}
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant='outline'
								onClick={() => setIsEditDialogOpen(false)}
							>
								Bekor qilish
							</Button>
							<Button
								onClick={handleUpdateShift}
								disabled={loading}
							>
								{loading ? 'Saqlanmoqda...' : 'Saqlash'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<AlertDialog
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Smenani o'chirish
							</AlertDialogTitle>
							<AlertDialogDescription>
								Siz rostdan ham bu smenani o'chirmoqchimisiz? Bu
								amalni qaytarib bo'lmaydi.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Bekor qilish</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteShift}
								className='bg-red-500 hover:bg-red-600'
							>
								O'chirish
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

function ShiftsSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
	const skeletonRows = Array(8).fill(null)

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
					</div>
				</div>
				<div className='overflow-x-auto'>
					{/* <table className='w-full border-collapse'>
						<thead>
							<tr className='bg-sidebar border-b'>
								<th className='p-4 text-left font-medium text-gray-700'>
									<Skeleton className='h-4 w-16' />
								</th>
								<th className='p-4 text-left font-medium text-gray-700'>
									<Skeleton className='h-4 w-24' />
								</th>
								<th className='p-4 text-left font-medium text-gray-700'>
									<Skeleton className='h-4 w-24' />
								</th>
								<th className='p-4 text-left font-medium text-gray-700'>
									<Skeleton className='h-4 w-24' />
								</th>
								<th className='p-4 text-left font-medium text-gray-700'>
									<Skeleton className='h-4 w-24' />
								</th>
								<th className='p-4 text-right font-medium text-gray-700'>
									<Skeleton className='h-4 w-16 ml-auto' />
								</th>
							</tr>
						</thead>
						<tbody>
							{skeletonRows.map((_, index) => (
								<tr key={index} className='border-b'>
									<td className='p-4'>
										<Skeleton className='h-6 w-6' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-6 w-24' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-6 w-32' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-6 w-20' />
									</td>
									<td className='p-4'>
										<Skeleton className='h-6 w-20' />
									</td>
									<td className='p-4 text-right'>
										<div className='flex justify-end gap-2'>
											<Skeleton className='h-8 w-8 rounded' />
											<Skeleton className='h-8 w-8 rounded' />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table> */}
					<table className='w-full border-collapse'>
	<thead>
		<tr className='bg-sidebar text-center border-b'>
			<th className='w-20 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-10 mx-auto' />
			</th>
			<th className='w-50 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-20 mx-auto' />
			</th>
			<th className='w-50 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-28 mx-auto' />
			</th>
			<th className='w-70 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-24 mx-auto' />
			</th>
			<th className='w-70 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-24 mx-auto' />
			</th>
			<th className='w-30 py-3 px-4 font-medium text-gray-700'>
				<Skeleton className='h-4 w-16 mx-auto' />
			</th>
		</tr>
	</thead>
	<tbody>
		{skeletonRows.map((_, index) => (
			<tr key={index} className='border-b text-center'>
				<td className='py-3 px-4'>
					<Skeleton className='h-6 w-6 mx-auto' />
				</td>
				<td className='py-3 px-4'>
					<Skeleton className='h-6 w-20 mx-auto' />
				</td>
				<td className='py-3 px-4'>
					<Skeleton className='h-6 w-28 mx-auto' />
				</td>
				<td className='py-3 px-4'>
					<Skeleton className='h-6 w-24 mx-auto' />
				</td>
				<td className='py-3 px-4'>
					<Skeleton className='h-6 w-24 mx-auto' />
				</td>
				<td className='py-3 px-4 text-right'>
					<div className='flex justify-end gap-2'>
						<Skeleton className='h-8 w-8 rounded' />
						<Skeleton className='h-8 w-8 rounded' />
					</div>
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

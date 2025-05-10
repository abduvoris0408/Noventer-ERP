'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'

type Branch = {
	id: number
	name: string
	region: string
	district: string
	phone: string
	additional_phone: string | null
	address: string
	latitude: string | null
	longitude: string | null
	working_days: []
}

type Shift = {
	id: number
	name: string
	start_time: string
	end_time: string
}

const formSchema = z.object({
	user: z.object({
		full_name: z
			.string()
			.min(1, { message: "To'liq ism kiritilishi shart" }),
		gender: z.enum(['male', 'female']),
		phone_number: z.string().regex(/^\+998\d{9}$/, {
			message: "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak",
		}),
		passport_number: z
			.string()
			.min(1, { message: 'Passport raqami kiritilishi shart' }),
		jshshr: z.string().min(1, { message: 'JSHSHR kiritilishi shart' }),
		birth_date: z.date(),
		salary_type: z.enum(['official', 'unofficial']),
	}),
	branch_id: z.number().min(0),
	department_id: z.number().min(0),
	shift_id: z.number().min(0),
	position: z.string().min(1, { message: 'Lavozim kiritilishi shart' }),
	salary: z.string().min(1, { message: 'Maosh kiritilishi shart' }),
	official_salary: z
		.string()
		.min(1, { message: 'Rasmiy maosh kiritilishi shart' }),
})

type EmployeeFormValues = z.infer<typeof formSchema>

export function EmployeeModal() {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
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
	const [shifts, setShifts] = useState<Shift[]>([])

	const form = useForm<EmployeeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user: {
				full_name: '',
				gender: 'male',
				phone_number: '+998',
				passport_number: '',
				jshshr: '',
				birth_date: new Date(1990, 0, 1),
				salary_type: 'official',
			},
			branch_id: 0,
			department_id: 0,
			shift_id: 0,
			position: 'employee',
			salary: '',
			official_salary: '',
		},
	})

	useEffect(() => {
		const branchId = form.getValues('branch_id')
		if (branchId) {
			fetchShifts(branchId)
		}
	}, [form.watch('branch_id')])

	const fetchShifts = async (branchId: number) => {
		if (!branchId) return

		try {
			const token = localStorage.getItem('accessToken')
			if (!token) {
				console.error('Access token not found')
				return
			}

			const response = await fetch(
				`https://api.noventer.uz/api/v1/company/shifts/${branchId}/`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.ok) {
				const data = await response.json()
				setShifts(data)
			} else {
				console.error('Failed to fetch shifts:', await response.text())
				setShifts([])
			}
		} catch (error) {
			console.error('Error fetching shifts:', error)
			setShifts([])
		}
	}

	async function onSubmit(values: EmployeeFormValues) {
		setIsSubmitting(true)
		try {
			const token = localStorage.getItem('accessToken')

			if (!token) {
				throw new Error('Access token not found in localStorage')
			}

			const response = await fetch(
				'https://api.noventer.uz/api/v1/employee/employees/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						...values,
						user: {
							...values.user,
							birth_date: format(
								values.user.birth_date,
								'yyyy-MM-dd'
							),
						},
					}),
				}
			)

			if (response.ok) {
				setOpen(false)
				form.reset()
			} else {
				console.error('Error adding employee:', await response.text())
			}
		} catch (error) {
			console.error('Error submitting form:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Button
				className='flex items-center gap-2 bg-[#3874ff] hover:bg-[#3874ff]/90 text-white cursor-pointer'
				onClick={() => setOpen(true)}
			>
				<Plus className='h-4 w-4' />
				Xodim qo'shish
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle className='text-xl font-semibold'>
							Xodim qo'shish
						</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6'
						>
							<div className='space-y-4'>
								<h3 className='font-medium'>
									Shaxsiy ma'lumotlar
								</h3>

								<FormField
									control={form.control}
									name='user.full_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>To'liq ism</FormLabel>
											<FormControl>
												<Input
													placeholder="To'liq ismni kiriting"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.gender'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Jinsi</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Jinsini tanlang' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='male'>
														Erkak
													</SelectItem>
													<SelectItem value='female'>
														Ayol
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.phone_number'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Telefon raqami
											</FormLabel>
											<FormControl>
												<Input
													placeholder='+998XXXXXXXXX'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.passport_number'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Passport raqami
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Passport raqamini kiriting'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.jshshr'
									render={({ field }) => (
										<FormItem>
											<FormLabel>JSHSHR</FormLabel>
											<FormControl>
												<Input
													placeholder='JSHSHR ni kiriting'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.birth_date'
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>
												Tug'ilgan sana
											</FormLabel>
											<div className='grid grid-cols-3 gap-2'>
												<Select
													onValueChange={day => {
														const currentDate =
															field.value ||
															new Date()
														const newDate =
															new Date(
																currentDate
															)
														newDate.setDate(
															Number.parseInt(day)
														)
														field.onChange(newDate)
													}}
													value={
														field.value
															? field.value
																	.getDate()
																	.toString()
															: '1'
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Kun' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Array.from(
															{ length: 31 },
															(_, i) => i + 1
														).map(day => (
															<SelectItem
																key={day}
																value={day.toString()}
															>
																{day}
															</SelectItem>
														))}
													</SelectContent>
												</Select>

												<Select
													onValueChange={month => {
														const currentDate =
															field.value ||
															new Date()
														const newDate =
															new Date(
																currentDate
															)
														newDate.setMonth(
															Number.parseInt(
																month
															)
														)
														field.onChange(newDate)
													}}
													value={
														field.value
															? field.value
																	.getMonth()
																	.toString()
															: '0'
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Oy' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{[
															'Yanvar',
															'Fevral',
															'Mart',
															'Aprel',
															'May',
															'Iyun',
															'Iyul',
															'Avgust',
															'Sentabr',
															'Oktabr',
															'Noyabr',
															'Dekabr',
														].map(
															(month, index) => (
																<SelectItem
																	key={index}
																	value={index.toString()}
																>
																	{month}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>

												<Select
													onValueChange={year => {
														const currentDate =
															field.value ||
															new Date()
														const newDate =
															new Date(
																currentDate
															)
														newDate.setFullYear(
															Number.parseInt(
																year
															)
														)
														field.onChange(newDate)
													}}
													value={
														field.value
															? field.value
																	.getFullYear()
																	.toString()
															: '1990'
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Yil' />
														</SelectTrigger>
													</FormControl>
													<SelectContent className='max-h-[200px]'>
														{Array.from(
															{
																length:
																	new Date().getFullYear() -
																	1940 +
																	1,
															},
															(_, i) =>
																new Date().getFullYear() -
																i
														).map(year => (
															<SelectItem
																key={year}
																value={year.toString()}
															>
																{year}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='user.salary_type'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Maosh turi</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Maosh turini tanlang' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='official'>
														Rasmiy
													</SelectItem>
													<SelectItem value='unofficial'>
														Norasmiy
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='space-y-4'>
								<h3 className='font-medium'>
									Ish ma'lumotlari
								</h3>

								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<FormField
										control={form.control}
										name='branch_id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Filial</FormLabel>
												<Select
													onValueChange={value => {
														const branchId =
															Number(value)
														field.onChange(branchId)
														fetchShifts(branchId)
													}}
													value={field.value.toString()}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Filialni tanlang' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{branches.map(
															branch => (
																<SelectItem
																	key={
																		branch.id
																	}
																	value={branch.id.toString()}
																>
																	{
																		branch.name
																	}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='department_id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bo'lim</FormLabel>
												<FormControl>
													<Input
														type='number'
														min='0'
														placeholder="Bo'lim ID"
														{...field}
														onChange={e =>
															field.onChange(
																Number(
																	e.target
																		.value
																)
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='shift_id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Smena</FormLabel>
												<Select
													onValueChange={value =>
														field.onChange(
															Number(value)
														)
													}
													value={
														field.value
															? field.value.toString()
															: ''
													}
													disabled={
														shifts.length === 0
													}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Smenani tanlang' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{shifts.map(shift => (
															<SelectItem
																key={shift.id}
																value={shift.id.toString()}
															>
																{shift.name} (
																{
																	shift.start_time
																}{' '}
																-{' '}
																{shift.end_time}
																)
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name='position'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Lavozim</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Lavozimni tanlang' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='employee'>
														Xodim
													</SelectItem>
													<SelectItem value='manager'>
														Menejer
													</SelectItem>
													<SelectItem value='admin'>
														Admin
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='salary'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Maosh</FormLabel>
												<FormControl>
													<Input
														placeholder='Maosh miqdorini kiriting'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='official_salary'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Rasmiy maosh
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Rasmiy maosh miqdorini kiriting'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<DialogFooter>
								<Button
									type='button'
									variant='outline'
									onClick={() => setOpen(false)}
									disabled={isSubmitting}
								>
									Bekor qilish
								</Button>
								<Button
									type='submit'
									className='bg-[#3874ff] hover:bg-[#3874ff]/90'
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Saqlanmoqda...
										</>
									) : (
										'Saqlash'
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '../components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'

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

	const form = useForm<EmployeeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user: {
				full_name: '',
				gender: 'male',
				phone_number: '+998',
				passport_number: '',
				jshshr: '',
				birth_date: new Date(),
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
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={'outline'}
															className={`w-full pl-3 text-left font-normal ${
																!field.value
																	? 'text-muted-foreground'
																	: ''
															}`}
														>
															{field.value ? (
																format(
																	field.value,
																	'dd.MM.yyyy'
																)
															) : (
																<span>
																	Sanani
																	tanlang
																</span>
															)}
															<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className='w-auto p-0'
													align='start'
												>
													<Calendar
														mode='single'
														selected={field.value}
														onSelect={
															field.onChange
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
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
												<FormControl>
													<Input
														type='number'
														min='0'
														placeholder='Filial ID'
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
												<FormControl>
													<Input
														type='number'
														min='0'
														placeholder='Smena ID'
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

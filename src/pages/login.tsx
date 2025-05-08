// import { Link } from 'react-router-dom'
// import { Logo, LogoDark } from '../assets'
// import LottieLoader from '../components/lottie-loader'

// import { Button } from '../components/ui/button'
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from '../components/ui/card'
// import { Input } from '../components/ui/input'
// import { Label } from '../components/ui/label'
// import { PhoneInput } from '../components/phone-input'

// export default function LoginPage() {
// 	return (
// 		<div className='flex min-h-screen w-full'>
// 			<div className='hidden w-1/2 items-center justify-center bg-muted p-8 md:flex'>
// 				<div className='relative h-full w-full max-w-md'>
// 					<LottieLoader />
// 				</div>
// 			</div>

// 			<div className='flex w-full items-center justify-center p-8 md:w-1/2'>
// 				<Card className='w-full max-w-md '>
// 					<CardHeader className='space-y-1 gap-y-2 flex flex-col justify-center items-center '>
// 						<div className='flex items-center'>
// 							<img
// 								src={Logo}
// 								alt='logo'
// 								className='hidden dark:block'
// 							/>
// 							<img
// 								src={LogoDark}
// 								alt='darklogo'
// 								className='block dark:hidden'
// 							/>
// 						</div>
// 						<CardTitle className='text-xl text-gray-600'></CardTitle>
// 						<CardDescription>
// 							Telefon raqamingiz va parolingizni kiriting
// 						</CardDescription>
// 					</CardHeader>
// 					<CardContent className='space-y-4'>
// 						<div className='space-y-2'>
// 							<Label htmlFor='phone'>Telefon raqam</Label>
// 							<PhoneInput
// 								id='phone'
// 								placeholder='+998 90 123 45 67'
// 								value=''
// 								onChange={() => {}}
// 							/>
// 						</div>
// 						<div className='space-y-2'>
// 							<div className='flex items-center justify-between'>
// 								<Label htmlFor='password'>Parol</Label>
// 								<Link
// 									to='/'
// 									className='text-sm text-primary hover:underline'
// 								>
// 									Parolni unutdingizmi?
// 								</Link>
// 							</div>
// 							<Input id='password' type='password' />
// 						</div>
// 					</CardContent>
// 					<CardFooter className='flex flex-col space-y-4'>
// 						<Button className='w-full' type='submit'>
// 							Tizimga kirish
// 						</Button>
// 						<div className='text-center text-sm'>
// 							Hisobingiz yo'qmi?{' '}
// 							<Link
// 								to='/login'
// 								className='text-primary hover:underline'
// 							>
// 								Ro'yxatdan o'tish
// 							</Link>
// 						</div>
// 					</CardFooter>
// 				</Card>
// 			</div>
// 		</div>
// 	)
// }

import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Logo, LogoDark } from '../assets'
import LottieLoader from '../components/lottie-loader'
import { MultiStepLoaderDemo } from '../components/multiloader'
import { PhoneInput } from '../components/phone-input'
import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

interface LoginResponse {
	success: boolean
	data: {
		phone_number: string
		tokens: {
			access: string
			refresh: string
		}
	}
}

const LoginPage: React.FC = () => {
	const [phone, setPhone] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault()

		if (!phone || !password) {
			toast.error('Telefon raqam va parol kiritilishi shart')
			return
		}
		setLoading(true)

		try {
			const response = await axios.post<LoginResponse>(
				'https://api.noventer.uz/api/v1/accounts/login/',
				JSON.stringify({
					phone_number: phone.split(' ').join(''),
					password: password,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			console.log('Login response:', response.data)

			const tokens = response.data?.data?.tokens

			if (tokens?.access && tokens?.refresh) {
				localStorage.setItem('accessToken', tokens.access)
				localStorage.setItem('refreshToken', tokens.refresh)

				navigate('/')
			} else {
				toast.error(
					'Tokenlar olinmadi, iltimos, qaytadan urinib ko‘ring'
				)
			}
		} catch (error) {
			let errorMessage = 'Tizimga kirishda xatolik yuz berdi'

			console.error('Login error:', error)

			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					errorMessage = "Noto'g'ri telefon raqam yoki parol"
				} else if (error.response?.data?.message) {
					errorMessage = error.response.data.message
				} else if (error.request) {
					errorMessage =
						"Server bilan bog'lanib bo'lmadi. Iltimos internetingizni tekshiring."
				}
			}

			toast.error(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			{loading ? (
				<div>
					<MultiStepLoaderDemo loading={loading} />
				</div>
			) : (
				<div className='flex min-h-screen w-full'>
					<div className='hidden w-1/2 items-center justify-center bg-muted p-8 md:flex'>
						<div className='relative h-full w-full max-w-md'>
							<LottieLoader />
						</div>
					</div>

					<div className='flex w-full items-center justify-center p-8 md:w-1/2'>
						<Card className='w-full max-w-md'>
							<form onSubmit={handleLogin}>
								<CardHeader className='space-y-1 gap-y-2 flex flex-col justify-center items-center'>
									<div className='flex items-center'>
										<img
											src={Logo}
											alt='logo'
											className='hidden dark:block'
										/>
										<img
											src={LogoDark}
											alt='darklogo'
											className='block dark:hidden'
										/>
									</div>
									<CardTitle className='text-xl text-gray-600'></CardTitle>
									<CardDescription>
										Telefon raqamingiz va parolingizni
										kiriting
									</CardDescription>
								</CardHeader>

								<CardContent className='space-y-4 my-4'>
									<div className='space-y-2'>
										<Label htmlFor='phone'>
											Telefon raqam
										</Label>
										<PhoneInput
											id='phone'
											placeholder='+998 90 123 45 67'
											value={phone}
											onChange={(val: string) =>
												setPhone(val)
											}
										/>
									</div>

									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<Label htmlFor='password'>
												Parol
											</Label>
											<Link
												to='/forgot-password'
												className='text-sm text-primary hover:underline'
											>
												Parolni unutdingizmi?
											</Link>
										</div>
										<Input
											id='password'
											type='password'
											value={password}
											onChange={e =>
												setPassword(e.target.value)
											}
										/>
									</div>
								</CardContent>

								<CardFooter className='flex flex-col space-y-4'>
									<Button
										className='w-full'
										type='submit'
										disabled={loading}
									>
										{loading
											? 'Kirish...'
											: 'Tizimga kirish'}
									</Button>
									<div className='text-center text-sm'>
										Hisobingiz yo'qmi?{' '}
										<Link
											to='/register'
											className='text-primary hover:underline'
										>
											Ro'yxatdan o'tish
										</Link>
									</div>
								</CardFooter>
							</form>
						</Card>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginPage

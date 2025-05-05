import { Link } from 'react-router-dom'
import { Logo, LogoDark } from '../assets'
import LottieLoader from '../components/lottie-loader'
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

export default function LoginPage() {
	return (
		<div className='flex min-h-screen w-full'>
			<div className='hidden w-1/2 items-center justify-center bg-muted p-8 md:flex'>
				<div className='relative h-full w-full max-w-md'>
					<LottieLoader />
				</div>
			</div>

			<div className='flex w-full items-center justify-center p-8 md:w-1/2'>
				<Card className='w-full max-w-md '>
					<CardHeader className='space-y-1 gap-y-2 flex flex-col justify-center items-center '>
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
							Telefon raqamingiz va parolingizni kiriting
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='phone'>Telefon raqam</Label>
							<PhoneInput
								id='phone'
								placeholder='+998 90 123 45 67'
							/>
						</div>
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label htmlFor='password'>Parol</Label>
								<Link
									to='/'
									className='text-sm text-primary hover:underline'
								>
									Parolni unutdingizmi?
								</Link>
							</div>
							<Input id='password' type='password' />
						</div>
					</CardContent>
					<CardFooter className='flex flex-col space-y-4'>
						<Button className='w-full' type='submit'>
							Tizimga kirish
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
				</Card>
			</div>
		</div>
	)
}

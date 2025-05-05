// import { Moon, Sun } from 'lucide-react'
// import { useEffect, useState } from 'react'

// const ToggleMode = () => {
// 	const [theme, setTheme] = useState('light')

// 	useEffect(() => {
// 		if (
// 			localStorage.getItem('theme') === 'dark' ||
// 			(!('theme' in localStorage) &&
// 				window.matchMedia('(prefers-color-scheme: dark)').matches)
// 		) {
// 			document.documentElement.classList.add('dark')
// 			setTheme('dark')
// 		} else {
// 			document.documentElement.classList.remove('dark')
// 			setTheme('light')
// 		}
// 	}, [])

// 	const toggleTheme = () => {
// 		if (theme === 'dark') {
// 			document.documentElement.classList.remove('dark')
// 			localStorage.setItem('theme', 'light')
// 			setTheme('light')
// 		} else {
// 			document.documentElement.classList.add('dark')
// 			localStorage.setItem('theme', 'dark')
// 			setTheme('dark')
// 		}
// 	}

// 	return (
// 		<button onClick={toggleTheme} className='rounded-md hover:bg-muted cursor-pointer p-1 transition-colors '>
// 			{theme === 'dark' ? (
// 				<Sun className='w-4 h-4 stroke-[1.]' />
// 			) : (
// 				<Moon className='w-4 h-4 stroke-[1.]' />
// 			)}
// 		</button>
// 	)
// }

// export default ToggleMode
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'

const ToggleMode = () => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark')
			setTheme('dark')
		} else {
			document.documentElement.classList.remove('dark')
			setTheme('light')
		}
	}, [])

	const toggleTheme = () => {
		if (theme === 'dark') {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
			setTheme('light')
		} else {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
			setTheme('dark')
		}
	}

	return (
		<Tooltip title={theme === 'dark' ? 'Light mode' : 'Dark mode'} placement='bottom'>
			<button
				onClick={toggleTheme}
				className='rounded-md hover:bg-muted cursor-pointer p-1 transition-colors'
			>
				{theme === 'dark' ? (
					<Sun className='w-4 h-4 stroke-[1.]' />
				) : (
					<Moon className='w-4 h-4 stroke-[1.]' />
				)}
			</button>
		</Tooltip>
	)
}

export default ToggleMode

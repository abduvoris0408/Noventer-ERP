import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge' // ✅ to‘g‘ri manba

export function cn(...inputs: any[]) {
	return twMerge(clsx(inputs))
}

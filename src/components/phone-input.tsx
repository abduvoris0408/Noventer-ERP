import type React from 'react'

import { useState } from 'react'
import { Input } from '../components/ui/input'

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string
}

export function PhoneInput({
	id,
	className,
	placeholder,
	...props
}: PhoneInputProps) {
	const [value, setValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Only allow numbers and plus sign
		const input = e.target.value.replace(/[^\d+]/g, '')

		// Format the phone number
		let formatted = input
		if (input.startsWith('+998') && input.length > 4) {
			const afterCode = input.substring(4)
			formatted =
				'+998 ' +
				(afterCode.length > 2
					? afterCode.substring(0, 2) + ' '
					: afterCode) +
				(afterCode.length > 5
					? afterCode.substring(2, 5) + ' '
					: afterCode.length > 2
					? afterCode.substring(2)
					: '') +
				(afterCode.length > 7
					? afterCode.substring(5, 7) + ' '
					: afterCode.length > 5
					? afterCode.substring(5)
					: '') +
				(afterCode.length > 7 ? afterCode.substring(7) : '')
		}

		setValue(formatted)
	}

	return (
		<Input
			id={id}
			type='tel'
			value={value}
			onChange={handleChange}
			placeholder={placeholder || '+998 90 123 45 67'}
			className={className}
			{...props}
		/>
	)
}

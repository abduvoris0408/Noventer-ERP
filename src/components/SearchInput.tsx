import { Search } from 'lucide-react'

const SearchInput = () => {
	return (
		<div className='relative w-full max-w-sm'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 stroke-[1.5]' />
			<input
				type='text'
				placeholder='Qidirish...'
				className='w-80 pl-10 pr-4 py-2 rounded-xl border border-input bg-sidebar text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
			/>
		</div>
	)
}

export default SearchInput

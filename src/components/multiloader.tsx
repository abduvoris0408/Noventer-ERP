import { MultiStepLoader as Loader } from './ui/multi-step-loader'

const loadingStates = [
	{ text: 'Phone number entered' },
	{ text: 'Password entered' },
	{ text: 'You have successfully logged in!' },
]

export function MultiStepLoaderDemo({ loading }: { loading: boolean }) {
	if (!loading) return null

	return (
		<div className='fixed inset-0 z-50 bg-white dark:bg-black flex items-center justify-center'>
			<Loader
				loadingStates={loadingStates}
				loading={true}
				duration={500}
			/>
		</div>
	)
}

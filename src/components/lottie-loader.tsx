import Lottie from 'lottie-react'
import Loader from '../assets/loaderanimate.json'
const LottieLoader = () => {
	return (
		<div className=' absolute top-0 right-0 left-0 bottom-0 flex  items-center justify-center  z-[9999]'>
			<Lottie animationData={Loader} loop={true} />
		</div>
	)
}

export default LottieLoader

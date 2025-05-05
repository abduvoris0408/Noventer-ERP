// import type React from "react"

// import { Calendar, ChevronLeft, Download, Edit2, FileText, Monitor, Save, Upload, X } from "lucide-react"
// import { useEffect, useRef, useState } from "react"

// import { Link, useOutletContext } from "react-router-dom"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Skeleton } from "../components/ui/skeleton"

// interface SidebarContextType {
//   isCollapsed: boolean
// }

// export default function ProfilePage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [isEditing, setIsEditing] = useState(false)
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const [formData, setFormData] = useState({
//     phone: "+998 99 966 7363",
//     email: "example@gmail.com",
//     birthday: "28.02.2001",
//     gender: "Erkak",
//     companyName: "NovEnter",
//     inn: "3211199123458",
//     registrationDate: "28.02.2001",
//     license: "Yuklab olish",
//   })

//   useEffect(() => {
//     // Show skeleton for 3 seconds
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 3000)

//     return () => clearTimeout(timer)
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const triggerFileInput = () => {
//     fileInputRef.current?.click()
//   }

//   const removeProfileImage = () => {
//     setProfileImage(null)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleSave = () => {
//     console.log("Saving data:", formData)
//     console.log("Profile image:", profileImage)
//     setIsEditing(false)
//   }
//   const { isCollapsed } = useOutletContext<SidebarContextType>() || {
//     isCollapsed: false,
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-14 w-[100%]">
//         <div
//           className="right-10 transition-all duration-300 ease-in-out py-6"
//           style={{
//             width: isCollapsed ? "calc(100% + 650px)" : "calc(100% + 430px)",
//           }}
//         >
//           {/* Skeleton for navigation */}
//           <div className="flex items-center border-b">
//             <div className="p-5">
//               <Skeleton className="h-5 w-5 rounded-full" />
//             </div>
//             <div className="flex flex-1 gap-4">
//               <Skeleton className="h-12 w-24" />
//               <Skeleton className="h-12 w-24" />
//             </div>
//           </div>

//           {/* Skeleton for Profile Header */}
//           <div className="my-2">
//             <Skeleton className="h-48 w-full rounded-2xl" />
//           </div>

//           {/* Skeleton for Stats */}
//           <div className="mt-10">
//             <div className="flex justify-between px-24 gap-10 mb-8">
//               {[1, 2, 3].map((_, index) => (
//                 <div key={index} className="text-center w-full">
//                   <Skeleton className="h-6 w-6 mx-auto mb-2 rounded-full" />
//                   <Skeleton className="h-4 w-24 mx-auto mb-2" />
//                   <Skeleton className="h-8 w-16 mx-auto mb-2" />
//                   <Skeleton className="h-3 w-32 mx-auto" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Skeleton for Data Section */}
//           <div className="px-24 mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Skeleton className="h-5 w-5 rounded-full" />
//                 <Skeleton className="h-6 w-32" />
//               </div>
//               <Skeleton className="h-9 w-28" />
//             </div>

//             <div className="grid grid-cols-2 gap-y-4 gap-x-6">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
//                 <div key={index}>
//                   <Skeleton className="h-4 w-32 mb-2" />
//                   <Skeleton className="h-9 w-full" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto py-14  w-[100%]">
//       <div
//         className="right-10 transition-all duration-300 ease-in-out py-6"
//         style={{
//           width: isCollapsed ? "calc(100% + 650px)" : "calc(100% + 430px)",
//         }}
//       >
//         <div className="flex items-center border-b">
//           <Link to="#" className="p-5">
//             <ChevronLeft className="h-5 w-5 text-[#707683]" />
//           </Link>
//           <div className="flex flex-1">
//             <Link to="#" className="px-4 py-5 text-[#005eeb] font-medium border-b-2 border-[#005eeb]">
//               Profile
//             </Link>
//             <Link to="#" className="px-4 py-5 text-[#90a0b7] font-medium">
//               History
//             </Link>
//           </div>
//         </div>

//         {/* Profile Header */}
//         <div className="my-2">
//           <div className="bg-gradient-to-r from-[#005eeb] to-[#00a5ff] p-6 pb-12 rounded-2xl relative overflow-hidden">
//             {/* Background pattern */}
//             <div className="absolute right-0 top-0 w-full h-full opacity-20">
//               <img src="/src/assets/background-pattern.jpg" alt="Background pattern" className="object-cover w-full" />
//             </div>

//             <div className="flex items-start gap-4  relative z-10">
//               <div className="relative">
//                 <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center text-[#005eeb] text-5xl font-bold overflow-hidden">
//                   {profileImage ? (
//                     <img
//                       src={profileImage || "/placeholder.svg" || "/placeholder.svg"}
//                       alt="Profile"
//                       className="object-cover"
//                     />
//                   ) : (
//                     "A"
//                   )}
//                 </div>

//                 {isEditing && (
//                   <div className="absolute -bottom-1 -right-1 flex gap-1">
//                     <button
//                       onClick={triggerFileInput}
//                       className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
//                     >
//                       <Upload className="h-4 w-4 text-[#005eeb]" />
//                     </button>

//                     {profileImage && (
//                       <button
//                         onClick={removeProfileImage}
//                         className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
//                       >
//                         <X className="h-4 w-4 text-red-500" />
//                       </button>
//                     )}

//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       onChange={handleImageUpload}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="text-white">
//                 <p className="text-sm opacity-90">Xush kelibsiz!</p>
//                 <h1 className="text-3xl font-bold mb-1">Sheroz Turdiyev</h1>
//                 <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Rahbar</span>
//               </div>

//               <div className="ml-auto">
//                 <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 text-white w-80">
//                   <p className="text-sm mb-1">Finance card</p>
//                   <p className="text-xs mb-3 opacity-80">ID: 0989736</p>

//                   <p className="text-sm mb-1">Current balance:</p>
//                   <p className="text-2xl font-bold">557 000 so'm</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-10">
//           <div className="flex justify-between px-24 gap-10 mb-8">
//             <div className="text-center">
//               <div className="flex justify-center mb-2">
//                 <Monitor className="h-6 w-6 text-[#90a0b7]" />
//               </div>
//               <p className="text-[#90a0b7] text-sm">Vazifalar</p>
//               <p className="text-3xl font-bold text-[#334d6e]">0</p>
//               <p className="text-xs text-[#90a0b7]">Group and individual</p>
//             </div>

//             <div className="text-center">
//               <div className="flex justify-center mb-2">
//                 <FileText className="h-6 w-6 text-[#90a0b7]" />
//               </div>
//               <p className="text-[#90a0b7] text-sm">Rasmiy oylik</p>
//               <p className="text-3xl font-bold text-[#334d6e]">
//                 0 <span className="text-sm font-normal">so'm</span>
//               </p>
//               <p className="text-xs text-[#90a0b7]">1 218 000 so'm</p>
//             </div>

//             <div className="text-center">
//               <div className="flex justify-center mb-2">
//                 <Calendar className="h-6 w-6 text-[#90a0b7]" />
//               </div>
//               <p className="text-[#90a0b7] text-sm">Norasmiy oylik</p>
//               <p className="text-3xl font-bold text-[#334d6e]">
//                 0 <span className="text-sm font-normal">so'm</span>
//               </p>
//               <p className="text-xs text-[#90a0b7]">1 218 000 so'm</p>
//             </div>
//           </div>
//         </div>

//         <div className="px-24 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <FileText className="h-5 w-5 text-[#90a0b7] mr-2" />
//               <h2 className="text-[#334d6e] font-medium">Malumotlar</h2>
//             </div>

//             {isEditing ? (
//               <Button
//                 onClick={handleSave}
//                 size="sm"
//                 className="bg-[#005eeb] hover:bg-[#0050cc] text-white flex items-center gap-1"
//               >
//                 <Save className="h-4 w-4" />
//                 Saqlash
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 size="sm"
//                 variant="outline"
//                 className="border-[#90a0b7] text-[#334d6e] flex items-center gap-1"
//               >
//                 <Edit2 className="h-4 w-4" />
//                 Tahrirlash
//               </Button>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-y-4 gap-x-6">
//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Telefon raqam:</p>
//               {isEditing ? (
//                 <Input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.phone}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Kompaniya nomi:</p>
//               {isEditing ? (
//                 <Input
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.companyName}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">email:</p>
//               {isEditing ? (
//                 <Input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                   type="email"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.email}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">INN:</p>
//               {isEditing ? (
//                 <Input
//                   name="inn"
//                   value={formData.inn}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.inn}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Birthday:</p>
//               {isEditing ? (
//                 <Input
//                   name="birthday"
//                   value={formData.birthday}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.birthday}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Ro'yxatdan o'tgan sana:</p>
//               {isEditing ? (
//                 <Input
//                   name="registrationDate"
//                   value={formData.registrationDate}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.registrationDate}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Gender:</p>
//               {isEditing ? (
//                 <Input
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   className="h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]"
//                 />
//               ) : (
//                 <p className="text-[#334d6e]">{formData.gender}</p>
//               )}
//             </div>

//             <div>
//               <p className="text-[#90a0b7] text-sm mb-1">Lizensiya:</p>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="mt-1 border-[#90a0b7] text-[#334d6e] hover:bg-[#f1f4f8] hover:text-[#005eeb] transition-colors flex items-center gap-1.5"
//               >
//                 <Download className="h-4 w-4" />
//                 Yuklab olish
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import type React from 'react'

import {
	Calendar,
	ChevronLeft,
	Download,
	Edit2,
	FileText,
	Monitor,
	Save,
	Upload,
	X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Link, useOutletContext } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Skeleton } from '../components/ui/skeleton'

interface SidebarContextType {
	isCollapsed: boolean
}

export default function ProfilePage() {
	const [isLoading, setIsLoading] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [profileImage, setProfileImage] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [formData, setFormData] = useState({
		phone: '+998 99 966 7363',
		email: 'example@gmail.com',
		birthday: '28.02.2001',
		gender: 'Erkak',
		companyName: 'NovEnter',
		inn: '3211199123458',
		registrationDate: '28.02.2001',
		license: 'Yuklab olish',
	})

	const [taskCount, setTaskCount] = useState(0)
	const [officialSalary, setOfficialSalary] = useState(0)
	const [unofficialSalary, setUnofficialSalary] = useState(0)

	useEffect(() => {
		// Show skeleton for 3 seconds
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (!isLoading) {
			// Target values
			const targetTasks = 12
			const targetOfficialSalary = 557000
			const targetUnofficialSalary = 650000

			// Animation duration in ms
			const animationDuration = 2000
			// Number of steps
			const steps = 50
			// Interval between steps
			const interval = animationDuration / steps

			// Calculate increment per step
			const taskIncrement = targetTasks / steps
			const officialSalaryIncrement = targetOfficialSalary / steps
			const unofficialSalaryIncrement = targetUnofficialSalary / steps

			let currentStep = 0

			const animationInterval = setInterval(() => {
				currentStep++

				setTaskCount(
					Math.min(
						Math.round(taskIncrement * currentStep),
						targetTasks
					)
				)
				setOfficialSalary(
					Math.min(
						Math.round(officialSalaryIncrement * currentStep),
						targetOfficialSalary
					)
				)
				setUnofficialSalary(
					Math.min(
						Math.round(unofficialSalaryIncrement * currentStep),
						targetUnofficialSalary
					)
				)

				if (currentStep >= steps) {
					clearInterval(animationInterval)
				}
			}, interval)

			return () => clearInterval(animationInterval)
		}
	}, [isLoading])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = e => {
				setProfileImage(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const triggerFileInput = () => {
		fileInputRef.current?.click()
	}

	const removeProfileImage = () => {
		setProfileImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleSave = () => {
		console.log('Saving data:', formData)
		console.log('Profile image:', profileImage)
		setIsEditing(false)
	}
	const { isCollapsed } = useOutletContext<SidebarContextType>() || {
		isCollapsed: false,
	}

	if (isLoading) {
		return (
			<div className='container mx-auto py-14 w-[100%]'>
				<div
					className='right-10 transition-all duration-300 ease-in-out py-6'
					style={{
						width: isCollapsed
							? 'calc(100% + 650px)'
							: 'calc(100% + 430px)',
					}}
				>
					{/* Skeleton for navigation */}
					<div className='flex items-center border-b'>
						<div className='p-5'>
							<Skeleton className='h-5 w-5 rounded-full' />
						</div>
						<div className='flex flex-1 gap-4'>
							<Skeleton className='h-12 w-24' />
							<Skeleton className='h-12 w-24' />
						</div>
					</div>

					{/* Skeleton for Profile Header */}
					<div className='my-2'>
						<Skeleton className='h-48 w-full rounded-2xl' />
					</div>

					{/* Skeleton for Stats */}
					<div className='mt-10'>
						<div className='flex justify-between px-24 gap-10 mb-8'>
							{[1, 2, 3].map((_, index) => (
								<div key={index} className='text-center w-full'>
									<Skeleton className='h-6 w-6 mx-auto mb-2 rounded-full' />
									<Skeleton className='h-4 w-24 mx-auto mb-2' />
									<Skeleton className='h-8 w-16 mx-auto mb-2' />
									<Skeleton className='h-3 w-32 mx-auto' />
								</div>
							))}
						</div>
					</div>

					{/* Skeleton for Data Section */}
					<div className='px-24 mb-8'>
						<div className='flex items-center justify-between mb-4'>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-5 w-5 rounded-full' />
								<Skeleton className='h-6 w-32' />
							</div>
							<Skeleton className='h-9 w-28' />
						</div>

						<div className='grid grid-cols-2 gap-y-4 gap-x-6'>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
								<div key={index}>
									<Skeleton className='h-4 w-32 mb-2' />
									<Skeleton className='h-9 w-full' />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto py-14  w-[100%]'>
			<div
				className='right-10 transition-all duration-300 ease-in-out py-6'
				style={{
					width: isCollapsed
						? 'calc(100% + 650px)'
						: 'calc(100% + 430px)',
				}}
			>
				<div className='flex items-center border-b'>
					<Link to='#' className='p-5'>
						<ChevronLeft className='h-5 w-5 text-[#707683]' />
					</Link>
					<div className='flex flex-1'>
						<Link
							to='#'
							className='px-4 py-5 text-[#005eeb] font-medium border-b-2 border-[#005eeb]'
						>
							Profile
						</Link>
						<Link
							to='#'
							className='px-4 py-5 text-[#90a0b7] font-medium'
						>
							History
						</Link>
					</div>
				</div>

				{/* Profile Header */}
				<div className='my-2'>
					<div className='bg-gradient-to-r from-[#005eeb] to-[#00a5ff] p-6 pb-12 rounded-2xl relative overflow-hidden'>
						{/* Background pattern */}
						<div className='absolute right-0 top-0 w-full h-full opacity-20'>
							<img
								src='/src/assets/background-pattern.jpg'
								alt='Background pattern'
								className='object-cover w-full'
							/>
						</div>

						<div className='flex items-start gap-4  relative z-10'>
							<div className='relative'>
								<div className='bg-white rounded-full w-24 h-24 flex items-center justify-center text-[#005eeb] text-5xl font-bold overflow-hidden'>
									{profileImage ? (
										<img
											src={profileImage}
											alt='Profile'
											className='object-cover'
										/>
									) : (
										'A'
									)}
								</div>

								{isEditing && (
									<div className='absolute -bottom-1 -right-1 flex gap-1'>
										<button
											onClick={triggerFileInput}
											className='bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors'
										>
											<Upload className='h-4 w-4 text-[#005eeb]' />
										</button>

										{profileImage && (
											<button
												onClick={removeProfileImage}
												className='bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors'
											>
												<X className='h-4 w-4 text-red-500' />
											</button>
										)}

										<input
											type='file'
											ref={fileInputRef}
											onChange={handleImageUpload}
											accept='image/*'
											className='hidden'
										/>
									</div>
								)}
							</div>

							<div className='text-white'>
								<p className='text-sm opacity-90'>
									Xush kelibsiz!
								</p>
								<h1 className='text-3xl font-bold mb-1'>
									Sheroz Turdiyev
								</h1>
								<span className='bg-white/20 text-white px-3 py-1 rounded-full text-sm'>
									Rahbar
								</span>
							</div>

							<div className='ml-auto'>
								<div className='bg-white/20 backdrop-blur-md rounded-lg p-4 text-white w-80'>
									<p className='text-sm mb-1'>Finance card</p>
									<p className='text-xs mb-3 opacity-80'>
										ID: 0989736
									</p>

									<p className='text-sm mb-1'>
										Current balance:
									</p>
									<p className='text-2xl font-bold'>
										557 000 so'm
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-10'>
					<div className='flex justify-between px-24 gap-10 mb-8'>
						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<Monitor className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>Vazifalar</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{taskCount}
							</p>
							<p className='text-xs text-[#90a0b7]'>
								Group and individual
							</p>
						</div>

						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<FileText className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>
								Rasmiy oylik
							</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{officialSalary.toLocaleString()}{' '}
								<span className='text-sm font-normal'>
									so'm
								</span>
							</p>
							<p className='text-xs text-[#90a0b7]'>
								1 218 000 so'm
							</p>
						</div>

						<div className='text-center'>
							<div className='flex justify-center mb-2'>
								<Calendar className='h-6 w-6 text-[#90a0b7]' />
							</div>
							<p className='text-[#90a0b7] text-sm'>
								Norasmiy oylik
							</p>
							<p className='text-3xl font-bold text-[#334d6e]'>
								{unofficialSalary.toLocaleString()}{' '}
								<span className='text-sm font-normal'>
									so'm
								</span>
							</p>
							<p className='text-xs text-[#90a0b7]'>
								1 218 000 so'm
							</p>
						</div>
					</div>
				</div>

				<div className='px-24 mb-8'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center'>
							<FileText className='h-5 w-5 text-[#90a0b7] mr-2' />
							<h2 className='text-[#334d6e] font-medium'>
								Malumotlar
							</h2>
						</div>

						{isEditing ? (
							<Button
								onClick={handleSave}
								size='sm'
								className='bg-[#005eeb] hover:bg-[#0050cc] text-white flex items-center gap-1'
							>
								<Save className='h-4 w-4' />
								Saqlash
							</Button>
						) : (
							<Button
								onClick={() => setIsEditing(true)}
								size='sm'
								variant='outline'
								className='border-[#90a0b7] text-[#334d6e] flex items-center gap-1'
							>
								<Edit2 className='h-4 w-4' />
								Tahrirlash
							</Button>
						)}
					</div>

					<div className='grid grid-cols-2 gap-y-4 gap-x-6'>
						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Telefon raqam:
							</p>
							{isEditing ? (
								<Input
									name='phone'
									value={formData.phone}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.phone}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Kompaniya nomi:
							</p>
							{isEditing ? (
								<Input
									name='companyName'
									value={formData.companyName}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.companyName}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								email:
							</p>
							{isEditing ? (
								<Input
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
									type='email'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.email}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>INN:</p>
							{isEditing ? (
								<Input
									name='inn'
									value={formData.inn}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>{formData.inn}</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Birthday:
							</p>
							{isEditing ? (
								<Input
									name='birthday'
									value={formData.birthday}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.birthday}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Ro'yxatdan o'tgan sana:
							</p>
							{isEditing ? (
								<Input
									name='registrationDate'
									value={formData.registrationDate}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.registrationDate}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Gender:
							</p>
							{isEditing ? (
								<Input
									name='gender'
									value={formData.gender}
									onChange={handleInputChange}
									className='h-9 border-[#90a0b7] focus-visible:ring-[#005eeb]'
								/>
							) : (
								<p className='text-[#334d6e]'>
									{formData.gender}
								</p>
							)}
						</div>

						<div>
							<p className='text-[#90a0b7] text-sm mb-1'>
								Lizensiya:
							</p>
							<Button
								variant='outline'
								size='sm'
								className='mt-1 border-[#90a0b7] text-[#334d6e] hover:bg-[#f1f4f8] hover:text-[#005eeb] transition-colors flex items-center gap-1.5'
							>
								<Download className='h-4 w-4' />
								Yuklab olish
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

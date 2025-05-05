import axios from 'axios'

// Asosiy API URL konfiguratsiyasi
const apiClient = axios.create({
	// Ishlab chiqish muhitida baseURL o'rnatish shart emas,
	// chunki Vite proxy avto ravishda `/api` so'rovlarini yo'naltiradi
	// Agar production uchun turli URL kerak bo'lsa, shartli ravishda qo'yishingiz mumkin
	// baseURL: import.meta.env.PROD ? 'https://api.noventer.uz' : '/api',
	baseURL: '/api', // Bu yerda faqat `/api` ishlatish ham yetarli
	timeout: 10000, // So'rov vaqti chegarasi (10 soniya)
	headers: {
		'Content-Type': 'application/json',
	},
})

// So'rovlarni yuborishdan oldin token qo'shish interceptori
apiClient.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => {
		return response
	},
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// Refresh token bilan yangi access token olish
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) {
					throw new Error('Refresh token mavjud emas')
				}

				const refreshResponse = await axios.post(
					'http://localhost:5173/api/v1/accounts/token/refresh/',
					{
						refresh: refreshToken,
					}
				)

				const { access } = refreshResponse.data
				localStorage.setItem('accessToken', access)

				// Yangi token bilan so'rovni takrorlash
				originalRequest.headers.Authorization = `Bearer ${access}`
				return apiClient(originalRequest)
			} catch (refreshError) {
				// Token yangilash muvaffaqiyatsiz bo'lsa, foydalanuvchini login sahifasiga yo'naltirish mumkin
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')

				// Agar bu kod komponentda bo'lmasa, useNavigate o'rniga window.location ishlatish mumkin
				// window.location.href = '/login';

				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient

import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://api.noventer.uz/api/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

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
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) {
					throw new Error('Refresh token mavjud emas')
				}

				const refreshResponse = await axios.post(
					'http://localhost:3000/api/v1/accounts/token/refresh/',
					{
						refresh: refreshToken,
					}
				)

				const { access } = refreshResponse.data
				localStorage.setItem('accessToken', access)

				originalRequest.headers.Authorization = `Bearer ${access}`
				return apiClient(originalRequest)
			} catch (refreshError) {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')

				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient

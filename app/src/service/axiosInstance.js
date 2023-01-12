import axios from 'axios';
import { refreshToken } from './tokenHelpers';

const providerId = localStorage.getItem('resProviderId');

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API + `/providers/${providerId}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const access_token = localStorage.getItem('access_token');

		if (access_token) {
			config.headers['Authorization'] = `Bearer ${access_token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error.config;
		if (error.response && error.response.status === 401) {
			const refresh_token = localStorage.getItem('refresh_token');
			await refreshToken(refresh_token);
			return axiosInstance(config);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;

import axios from 'axios';

export const refreshToken = (refresh_token) => {
	const realm = localStorage.getItem('queryRealm');

	return axios
		.post(
			process.env.REACT_APP_KEYCLOAK_URL +
				'auth/realms/' +
				`${realm}` +
				'/protocol/openid-connect/token',
			new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token,
				client_id: process.env.REACT_APP_CLIENT_ID,
			})
		)
		.then((response) => {
			localStorage.setItem('access_token', response.data.access_token);
			localStorage.setItem('refresh_token', response.data.refresh_token);
		})
		.catch((error) => console.log(error));
};

export const deleteToken = () => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
};

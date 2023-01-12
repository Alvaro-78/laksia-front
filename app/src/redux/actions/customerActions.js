import axiosInstance from '../../service/axiosInstance';
import { types } from '../types/types';

const getCustomers = (customers) => ({
	type: types.GET_CUSTOMERS,
	payload: {
		customers,
	},
});

const addCustomer = (customer) => ({
	type: types.ADD_CUSTOMER,
	payload: {
		customer,
	},
});

const editCustomer = (customer) => ({
	type: types.EDIT_CUSTOMER,
	payload: {
		customer,
	},
});

const deleteCustomer = (customerId) => ({
	type: types.DELETE_CUSTOMER,
	payload: {
		customerId,
	},
});

export const resetCustomers = () => ({
	type: types.RESET_CUSTOMERS,
});

export const startGetCustomers = () => {
	return async (dispatch) => {
		await axiosInstance
			.get('/customers')
			.then((res) => dispatch(getCustomers(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startAddCustomer = (customer) => {
	const {
		name,
		description,
		date,
		video,
		ticket,
		logo,
		banner,
		link,
		geolocation,
		localization,
		assets,
	} = customer;

	const options = {
		method: 'POST',
		url: '/customers',
		data: {
			name,
			description,
			localization,
			date,
			video,
			ticket,
			logo,
			banner,
			link,
			geolocation,
			assets,
		},
	};

	// Get the customer from the response and add it to the state
	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(addCustomer(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startEditCustomer = (customer) => {
	const {
		_id,
		providerId,
		name,
		description,
		localization,
		date,
		video,
		ticket,
		logo,
		banner,
		link,
		geolocation,
		assets,
	} = customer;

	const options = {
		method: 'PUT',
		url: '/customers',
		data: {
			_id,
			providerId,
			name,
			description,
			localization,
			date,
			video,
			ticket,
			logo,
			banner,
			link,
			geolocation,
			assets,
		},
	};
	console.log(options);
	// Get the customer from the response and add it to the state
	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(editCustomer(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startDeleteCustomer = (customerId) => {
	const options = {
		method: 'DELETE',
		url: '/customers/' + customerId,
	};

	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then(() => dispatch(deleteCustomer(customerId)))
			.catch((err) => console.log(err));
	};
};

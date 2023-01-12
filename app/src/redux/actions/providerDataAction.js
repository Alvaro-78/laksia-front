import { types } from '../types/types';

export const login = (data) => ({
	type: types.LOGIN,
	payload: {
		data: data,
	},
});

export const logOut = () => ({ type: types.LOGOUT });

export const providerData = (data) => ({
	type: types.PROVIDER_INFO,
	payload: {
		data: data,
	},
});

export const addCustomer = (customer) => ({
	type: types.ADD_CUSTOMER,
	payload: customer,
});

export const editCustomer = (id, customer) => ({
	type: types.EDIT_CUSTOMER,
	payload: {
		id: id,
		customer: customer,
	},
});

export const addRoom = (customerId, room) => ({
	type: types.ADD_ROOM,
	payload: {
		customerId: customerId,
		room: room,
	},
});

export const editRoom = (customerId, roomId, room) => ({
	type: types.EDIT_ROOM,
	payload: {
		customerId: customerId,
		roomId: roomId,
		room: room,
	},
});

export const addConcert = (customerId, roomId, concert) => ({
	type: types.ADD_CONCERT,
	payload: {
		customerId: customerId,
		roomId: roomId,
		concert: concert,
	},
});

export const editConcert = (customerId, roomId, concertId, concert) => ({
	type: types.EDIT_CONCERT,
	payload: {
		customerId: customerId,
		roomId: roomId,
		concertId: concertId,
		concert: concert,
	},
});

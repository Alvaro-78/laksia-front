import axiosInstance from '../../service/axiosInstance';
import { types } from '../types/types';

const getRooms = (rooms) => ({
	type: types.GET_ROOMS,
	payload: {
		rooms,
	},
});

const addRoom = (room) => ({
	type: types.ADD_ROOM,
	payload: {
		room,
	},
});

const editRoom = (room) => ({
	type: types.EDIT_ROOM,
	payload: {
		room,
	},
});

const deleteRoom = (roomId) => ({
	type: types.DELETE_ROOM,
	payload: {
		roomId,
	},
});

export const resetRooms = () => ({
	type: types.RESET_ROOMS,
});

export const startGetRooms = (customerId) => {
	return async (dispatch) => {
		await axiosInstance
			.get('/customers/' + customerId + '/rooms')
			.then((res) => dispatch(getRooms(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startAddRoom = (customerId, room) => {
	const {
		name,
		description,
		date,
		video,
		ticket,
		image,
		link,
		geolocation,
		localization,
		assets,
	} = room;

	const options = {
		method: 'POST',
		url: '/customers/' + customerId + '/rooms',
		data: {
			name,
			description,
			localization,
			date,
			video,
			ticket,
			image,
			link,
			geolocation,
			assets,
		},
	};

	// Get the room from the response and add it to the state
	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(addRoom(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startEditRoom = (customerId, room) => {
	const {
		_id,
		name,
		description,
		date,
		video,
		ticket,
		image,
		link,
		geolocation,
		localization,
		assets,
	} = room;

	const options = {
		method: 'PUT',
		url: '/customers/' + customerId + '/rooms',
		data: {
			_id,
			name,
			description,
			localization,
			date,
			video,
			ticket,
			image,
			link,
			geolocation,
			assets,
		},
	};

	// Get the room from the response and add it to the state
	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(editRoom(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startDeleteRoom = (room) => {
	const { _id, customerId } = room;

	const options = {
		method: 'DELETE',
		url: '/customers/' + customerId + '/rooms/' + _id,
	};

	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then(() => dispatch(deleteRoom(_id)))
			.catch((err) => console.log(err));
	};
};

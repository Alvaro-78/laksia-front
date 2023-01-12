import axiosInstance from '../../service/axiosInstance';
import { types } from '../types/types';

const getConcerts = (concerts) => ({
	type: types.GET_CONCERTS,
	payload: {
		concerts,
	},
});

const addConcert = (concert) => ({
	type: types.ADD_CONCERT,
	payload: {
		concert,
	},
});

const editConcert = (concert) => ({
	type: types.EDIT_CONCERT,
	payload: {
		concert,
	},
});

const deleteConcert = (concertId) => ({
	type: types.DELETE_CONCERT,
	payload: {
		concertId,
	},
});

export const resetConcerts = () => ({
	type: types.RESET_CONCERTS,
});

export const startGetConcerts = (customerId, roomId) => {
	return async (dispatch) => {
		await axiosInstance
			.get('/customers/' + customerId + '/rooms/' + roomId + '/concerts')
			.then((res) => dispatch(getConcerts(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startAddConcert = (customerId, concert) => {
	const { roomId, name, description, date, image, link, geolocation, assets } =
		concert;

	const options = {
		method: 'POST',
		url: '/customers/' + customerId + '/rooms/' + roomId + '/concerts',
		data: {
			roomId,
			name,
			description,
			date,
			image,
			link,
			geolocation,
			assets,
		},
	};

	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(addConcert(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startEditConcert = (customerId, concert) => {
	const {
		_id,
		roomId,
		name,
		description,
		date,
		image,
		link,
		geolocation,
		assets,
	} = concert;

	const options = {
		method: 'PUT',
		url: '/customers/' + customerId + '/rooms/' + roomId + '/concerts',
		data: {
			_id,
			roomId,
			name,
			description,
			date,
			image,
			link,
			geolocation,
			assets,
		},
	};

	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then((res) => dispatch(editConcert(res.data)))
			.catch((err) => console.log(err));
	};
};

export const startDeleteConcert = (customerId, concert) => {
	const { _id, roomId } = concert;

	const options = {
		method: 'DELETE',
		url: '/customers/' + customerId + '/rooms/' + roomId + '/concerts/' + _id,
	};

	return async (dispatch) => {
		await axiosInstance
			.request(options)
			.then(() => dispatch(deleteConcert(_id)))
			.catch((err) => console.log(err));
	};
};

import { types } from '../types/types';

const initialState = {
	data: [],
};

export const providerDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN:
			return {
				...state,
				data: action.payload.data,
			};

		case types.LOGOUT:
			return {
				...state,
				data: initialState,
			};

		case types.PROVIDER_INFO:
			return {
				...state,
				data: action.payload.data,
			};

		case types.ADD_CUSTOMER:
			return {
				...state,
				data: {
					...state.data,
					customers: [...state.data.customers, action.payload],
				},
			};

		case types.EDIT_CUSTOMER:
			// This is a placeholder, in the final version the customer will be replaced with the edited one
			return {
				...state,
				data: {
					...state.data,
					customers: state.data.customers.map((customer) =>
						customer._id === action.payload.id
							? {
									...customer,
									name: action.payload.customer.name,
									description: action.payload.customer.description,
									date: action.payload.customer.date,
									video: action.payload.customer.video,
									ticket: action.payload.customer.ticket,
									logo: action.payload.customer.logo,
									banner: action.payload.customer.banner,
									link: action.payload.customer.link,
									geolocation: action.payload.customer.geolocation,
							  }
							: customer
					),
				},
			};

		case types.ADD_ROOM:
			return {
				...state,
				data: {
					...state.data,
					customers: state.data.customers.map((customer) =>
						customer._id === action.payload.customerId
							? {
									...customer,
									rooms: [...customer.rooms, action.payload.room],
							  }
							: customer
					),
				},
			};

		case types.EDIT_ROOM:
			return {
				...state,
				data: {
					...state.data,
					customers: state.data.customers.map((customer) =>
						customer._id === action.payload.customerId
							? {
									...customer,
									rooms: customer.rooms.map((room) =>
										room._id === action.payload.roomId
											? {
													...room,
													name: action.payload.room.name,
													description: action.payload.room.description,
													date: action.payload.room.date,
													image: action.payload.room.image,
													link: action.payload.room.link,
													geolocation: action.payload.room.geolocation,
											  }
											: room
									),
							  }
							: customer
					),
				},
			};

		case types.ADD_CONCERT:
			return {
				...state,
				data: {
					...state.data,
					customers: state.data.customers.map((customer) =>
						customer._id === action.payload.customerId
							? {
									...customer,
									rooms: customer.rooms.map((room) =>
										room._id === action.payload.roomId
											? {
													...room,
													concerts: [...room.concerts, action.payload.concert],
											  }
											: room
									),
							  }
							: customer
					),
				},
			};

		case types.EDIT_CONCERT:
			return {
				...state,
				data: {
					...state.data,
					customers: state.data.customers.map((customer) =>
						customer._id === action.payload.customerId
							? {
									...customer,
									rooms: customer.rooms.map((room) =>
										room._id === action.payload.roomId
											? {
													...room,
													concerts: room.concerts.map((concert) =>
														concert._id === action.payload.concertId
															? {
																	...concert,
																	name: action.payload.concert.name,
																	description:
																		action.payload.concert.description,
																	date: action.payload.concert.date,
																	image: action.payload.concert.image,
																	link: action.payload.concert.link,
															  }
															: concert
													),
											  }
											: room
									),
							  }
							: customer
					),
				},
			};

		default:
			return state;
	}
};

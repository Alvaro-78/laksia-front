import { types } from "../types/types";

const initialState = {
  rooms: []
}

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms
      };

    case types.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room]
      };

    case types.EDIT_ROOM:
      return {
        ...state,
        rooms: state.rooms.map(
          (room) => room._id === action.payload.room._id ? action.payload.room : room
        )
      };

    case types.DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(
          (room) => room._id !== action.payload.roomId
        )
      };

    case types.RESET_ROOMS:
      return {
        rooms: []
      };

    default:
      return state;
  }
}
import { types } from "../types/types";

const initialState = {
  concerts: []
};

export const concertReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONCERTS:
      return {
        ...state,
        concerts: action.payload.concerts
      };
    
    case types.ADD_CONCERT: 
      return {
        ...state,
        concerts: [...state.concerts, action.payload.concert]
      };

    case types.EDIT_CONCERT:
      return {
        ...state,
        concerts: state.concerts.map(
          (concert) => concert._id === action.payload.concert._id ? action.payload.concert : concert
        )
      };

    case types.DELETE_CONCERT:
      return {
        ...state,
        concerts: state.concerts.filter(
          (concert) => concert._id !== action.payload.concertId
        )
      };

    case types.RESET_CONCERTS:
      return {
        concerts: []
      };

    default:
      return state;
  }
}
import { types } from "../types/types";

const initialState = {
    customers: []
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.customers
            };

        case types.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer]
            };

        case types.EDIT_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(
                    (customer) => customer._id === action.payload.customer._id ? action.payload.customer : customer
                )
            };

        case types.DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(
                    (customer) => customer._id !== action.payload.customerId
                )
            };

        case types.RESET_CUSTOMERS:
            return {
                customers: []
            };
        
        default:
            return state;
    }
}
import { types } from "../types/types";

const initialState = {
    assets: []
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ASSETS:
            return {
                ...state, assets: action.payload.assets
            };

        case types.RESET_ASSETS: 
            return {
                assets: []
            };

        default:
            return state;
    }
}
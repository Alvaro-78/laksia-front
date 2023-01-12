import { types } from "../types/types";

export const getAssets = (assets) => ({
    type: types.GET_ASSETS,
    payload: {
        assets: assets
    }
});

export const resetAssets = () => ({
    type: types.RESET_ASSETS
});
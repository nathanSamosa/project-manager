import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const StoreContext = createContext();

export const initialState = {
    refresh: true,
    user: ''
};

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        case STORE_ACTIONS.REFRESH:
            return {
                ...state,
                refresh: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
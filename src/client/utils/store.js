import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const StoreContext = createContext();

export const initialState = {
    refresh: false,
    currentTab: 'projects',
    user: {},
    projects: [],
    selectedProject: {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.REFRESH:
            return {
                ...state,
                refresh: action.payload
            };
        case STORE_ACTIONS.CURRENT_TAB:
        return {
            ...state,
            currentTab: action.payload
        };
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        case STORE_ACTIONS.PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case STORE_ACTIONS.SELECTED_PROJECT:
        return {
            ...state,
            selectedProject: action.payload,
        };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
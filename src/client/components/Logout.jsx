import React, { useContext } from 'react';
import { StoreContext } from '../utils/store';
import { LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

export const Logout = () => {
    const { dispatch } = useContext(StoreContext);

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleClick = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);

        handleDispatch(STORE_ACTIONS.USER, null);
    };

    return (
        <button onClick={handleClick}>Logout</button>
    )
}
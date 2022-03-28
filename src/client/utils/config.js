/* eslint-disable no-undef */
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API_URL = {
    USER_GET: `${SERVER_URL}/user/get`,
    USER_LOGIN: `${SERVER_URL}/user/login`,
};

const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const LOCAL_STORAGE = {
    TOKEN: 'token',
};

const STORE_ACTIONS = {
    USER: 'user',
}

module.exports = {
    API_URL,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS
};
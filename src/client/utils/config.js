/* eslint-disable no-undef */
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const API_URL = {
    USER_GET: `${SERVER_URL}/user/get`,
    USER_LOGIN: `${SERVER_URL}/user/login`,
    USER_REGISTER: `${SERVER_URL}/user/register`,
    PROJECT_GET: `${SERVER_URL}/project/`,
    PROJECT_CREATE: `${SERVER_URL}/project/create`,
    ITEM: `${SERVER_URL}/kanban/item`,
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
    REFRESH: 'refresh',
    CURRENT_TAB: 'currentTab',
    USER: 'user',
    PROJECTS: 'projects',
    SELECTED_PROJECT: 'selectedProject'
}

const ROUTES = {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register'
}

module.exports = {
    API_URL,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS,
    ROUTES
};
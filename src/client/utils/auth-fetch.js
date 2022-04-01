import { HTTP_METHOD, API_URL } from './config';

//POST

export const userRegister = async (reqBody) => {
    const response = await fetch(API_URL.USER_REGISTER, postConfig(reqBody));
    const data = await response.json();
    return data;
}

export const userLogin = async (reqBody) => {
    const response = await fetch(API_URL.USER_LOGIN, postConfig(reqBody));
    const data = await response.json();
    return data;
};

export const projectPost = async (reqBody, token) => {
    const fetchOptions = postConfig(reqBody)
    const response = await fetch(API_URL.PROJECT_CREATE, {
        ...fetchOptions, headers: { ...fetchOptions.headers,  Authorization: token }
    })
    const data = await response.json();
    return data
}

export const postItem = async (reqBody, token) => {
    const fetchOptions = postConfig(reqBody)
    const response = await fetch(API_URL.ITEM, {
        ...fetchOptions, headers: { ...fetchOptions.headers,  Authorization: token }
    })
    const data = await response.json();
    return data
}

const postConfig = (reqBody) => {
    return {
        method: HTTP_METHOD.POST,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }
}

//GET

export const dataFetch = async (token) => {
    const response = await fetch(API_URL.PROJECT_GET, fetchConfig(token));
    const data = await response.json()
    return data
}

const fetchConfig = (token) => {
    return {
        method: HTTP_METHOD.GET,
        headers: {
            Authorization: token
        }
    }
}

export const tokenFetch = async(url, token) => {
    try {
        const response = await fetch(url, {
            method: HTTP_METHOD.GET,
            headers: {
                Authorization: token,
            },
        })
        const result = await response.json();
        return result
    } catch (error) {
        return error;
    }
}

//PUT

export const putItem = async (reqBody, token) => {
    const fetchOptions = putConfig(reqBody)
    const response = await fetch(API_URL.ITEM, {
        ...fetchOptions, headers: { ...fetchOptions.headers,  Authorization: token }
    })
    const data = await response.json();
    return data
}

const putConfig = (reqBody) => {
    return {
        method: HTTP_METHOD.PUT,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }
}

//DELETE

export const deleteItem = async (reqBody, token) => {
    const fetchOptions = deleteConfig(reqBody)
    const response = await fetch(API_URL.ITEM, {
        ...fetchOptions, headers: { ...fetchOptions.headers,  Authorization: token }
    })
    const data = await response.json();
    return data
}

const deleteConfig = (reqBody) => {
    return {
        method: HTTP_METHOD.DELETE,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }
}
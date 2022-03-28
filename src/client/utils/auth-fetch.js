import { HTTP_METHOD } from './config';

export const userLogin = async (url, reqBody) => {
    const response = await fetch(url, {
        method: HTTP_METHOD.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    });
    const data = await response.json();

    return data;
};

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
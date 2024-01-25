// http.service.js


import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:3000/';

const axios = Axios.create({
    withCredentials: true,
    baseURL: BASE_URL, // Set the baseURL directly
});



export const httpService = {
    async get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    async post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    async put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    async delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    console.log('Request started:', method, endpoint);
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        });
        console.log('Request successful:', method, endpoint);
        return res.data;
    } catch (err) {
        console.log('Request failed:', method, endpoint);
        console.log('Data:', data);

        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            window.location.assign('/');
        }
        throw err;
    }
}

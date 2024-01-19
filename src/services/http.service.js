import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
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
        console.error(err);

        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            // window.location.assign('/');
        }
        throw err;
    }
}
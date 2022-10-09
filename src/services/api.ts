import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.4:3333',
    // baseURL: 'http://192.168.2.19:3333',
});

export { api };
import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

// Add a request interceptor
instance.interceptors.request.use(function (config:InternalAxiosRequestConfig | any) {
    // Do something before request is sent
    // gắn token vào header
    let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth')||"")?.token?.slice(1, -1)
    config.headers = {
        authorization: token ? `Bearer ${token}` : null
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // refresh token
    return Promise.resolve(response)
}, function (error) {
    return Promise.reject(error.response.data||error.response.data)
});


export default instance
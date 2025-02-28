import axios, { AxiosRequestHeaders } from "axios";
import Cookies from 'universal-cookie';

const BASE_API_URL = 'https://rest-test.machineheads.ru/';

const cookies = new Cookies();

let isRefreshing = false;
let responsesQueue: any[] = [];


const getAccessToken = () => {
    return cookies.get('accessToken')
}
const getRefreshToken = () => {
    return cookies.get('refreshToken')
}

const setAccessToken = (token: string) => {
    cookies.set('accessToken', token)
}
const setRefreshToken = (token: string) => {
    cookies.set('refreshToken', token, {maxAge: 24*60*60*7})
}

const handlerQueue = (error: any, token: string | null) => {
    responsesQueue.forEach((cb) => {
        if (error) {
            cb.reject(error);
        } else {
            cb.resolve(token);
        }
    })

    responsesQueue = [];
}

const request = axios.create({
    baseURL: BASE_API_URL,
});

request.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
        (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, 
    (error) => {
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    (response) => {
        return response 
    },

    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    responsesQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return request(originalRequest)
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const formData = new FormData();
                formData.append('refresh_token', getRefreshToken());
                await request.post('/auth/token-refresh', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((response) => {
                    setAccessToken(response.data.access_token)
                    setRefreshToken(response.data.refresh_token)
                    request.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
                    handlerQueue(null, response.data.access_token)
                    originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
                    return request(originalRequest)
                })
            } catch {
                handlerQueue(error, null);
                return Promise.reject(error)
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
)



export {request, setAccessToken, getAccessToken, getRefreshToken, setRefreshToken};
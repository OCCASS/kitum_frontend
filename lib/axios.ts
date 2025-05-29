import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
let failedQueue: { resolve: (value?: unknown) => void, reject: (reason?: unknown) => void }[] = [];

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (token) {
            resolve(token);
        } else {
            reject(error);
        }
    });
    failedQueue = [];
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Пример: "https://api.example.com"
    withCredentials: true, // если используешь cookie
});

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const access = Cookies.get("access");
        const fingerprint = Cookies.get("fp");

        if (access) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${access}`,
                "X-Fingerprint": fingerprint || "",
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                try {
                    await refreshPromise;
                    return instance(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            refreshPromise = new Promise(async (resolve, reject) => {
                try {
                    const refresh = Cookies.get("refresh");

                    if (!refresh) {
                        reject("No refresh token");
                        return;
                    }

                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                        refresh,
                    });

                    const { access, refresh: newRefresh } = res.data;

                    Cookies.set("access", access, { secure: true });
                    Cookies.set("refresh", newRefresh, { secure: true });

                    processQueue(null, access);
                    resolve();
                } catch (err) {
                    processQueue(err, null);
                    reject(err);
                } finally {
                    isRefreshing = false;
                    refreshPromise = null;
                }
            });

            try {
                await refreshPromise;
                return instance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;

import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 30000,
});

// Request Interceptor
api.interceptors.request.use((config) => {
    const deviceId = localStorage.getItem("device_id");
    if (deviceId) config.headers["X-Device-ID"] = deviceId;

    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Handle custom success: false from API even with 200 status
        if (response.data && response.data.success === false) {
            const errorMessage = response.data.error || response.data.message || "API Error";

            // Extract nested validation errors if any
            if (response.data.errors && typeof response.data.errors === 'object') {
                const messages = Object.values(response.data.errors).flat();
                if (messages.length > 0) {
                    toast.error(messages.join('\n'));
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error(errorMessage);
            }

            const error = new Error(errorMessage);
            error.response = response;
            return Promise.reject(error);
        }
        return response;
    },
    (error) => {
        // Handle Unauthorized
        if (error.response && error.response.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
            // Optional: only redirect if not already on login page
            if (window.location.pathname !== '/auth/login') {
                toast.error("Session expired. Please login again.");
                window.location.href = '/auth/login';
            }
        }

        // Handle Server Errors (500)
        if (error.response && error.response.status >= 500) {
            toast.error("Internal Server Error. Please try again later.");
        }

        // Handle Timeout / Network Error
        if (error.code === 'ECONNABORTED' || !error.response) {
            toast.error("Network error or timeout. Please check your connection.");
        }

        const responseData = error.response?.data;
        if (responseData && typeof responseData === 'object') {
            const errorMessage = responseData.error || responseData.message;

            if (responseData.errors && typeof responseData.errors === 'object') {
                const messages = Object.values(responseData.errors).flat();
                if (messages.length > 0) {
                    error.message = messages.join('\n');
                } else if (errorMessage) {
                    error.message = errorMessage;
                }
            } else if (errorMessage) {
                error.message = errorMessage;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
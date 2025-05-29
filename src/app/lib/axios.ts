import axios from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,  // Ensure cookies are sent with requests
})


// Remove the request interceptor that reads from localStorage
api.interceptors.request.use((config) => {
    // No need to read from localStorage anymore
    return config;
})


// Add a response interceptor to handle token expiration or unauthorized access
// This is a simple interceptor that checks for 401 status code and redirects to the login page
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration or unauthorized access
            // Optionally, you can redirect the user to the login page or show a notification
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)


export default api;
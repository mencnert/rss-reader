import axios from "axios";

export const createService = (token) => {
    const http = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        timeout: 10000,
        headers: {
            Authorization: "Basic " + token,
        }
    })
    return {
        checkAuth: async () => {
            try {
                const res = await http.post(`/checkauth`);
                if (res.status !== 200) {
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}
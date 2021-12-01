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
        },
        fetchRssList: async () => {
            try {
                const res = await http.get('/rss')
                if (res.status !== 200) {
                    console.error("Error during /rss call", res.status, res.data)
                    return []
                }

                return res.data
            } catch (err) {
                console.error("Error during /rss call", err)
                return []
            }
        },
        updateById: async (id, viewed, saved) => {
            try {
                const res = await http.put(`/rss/${id}`, { viewed, saved })
                if (res.status !== 200) {
                    console.error("Error during /rss/id call", res.status, res.data)
                    return false
                }
                return true
            } catch (err) {
                console.error("Error during /rss/id call", err)
                return false
            }
        },
        getNextFromQueue: async () => {
            try {
                const res = await http.get('/rss/queue/next')
                if (res.status !== 200) {
                    console.error("Error during /rss/queue/next call", res.status, res.data)
                    return { count: 0 }
                }

                return res.data
            } catch (err) {
                console.error("Error during /rss/queue/next call", err)
                return { count: 0 }
            }
        }
    }
}
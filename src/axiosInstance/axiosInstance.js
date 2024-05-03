import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://afrikimpact-api.onrender.com",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

export default axiosInstance
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://afrik-impact-api-44cy-h5e8a859d-ange-sepdeus-projects.vercel.app",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

export default axiosInstance
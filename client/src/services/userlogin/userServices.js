import axios from "axios"

const api=axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
})

export const fetchUser=(user)=>api.post(`/api/user/login/`,user)
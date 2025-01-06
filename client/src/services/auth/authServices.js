import axios from "axios"

const api=axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
})

// export const fetchUser=(user)=>api.post(`/api/user/login/`,user)
export const manualAuth = (userr) => api.post(`/api/user/manual`, userr, {withCredentials: true})
export const logout = () => api.post(`/api/user/logout`,{},{withCredentials: true})
export const fetchUser = (userid)=> api.get(`/api/user/getuser/${userid}`)
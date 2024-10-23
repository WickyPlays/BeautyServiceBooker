import axios from "./axios.js"

const login = (email, password) => {
    return axios.post("/auth/login", { email, password });
}

export { login };
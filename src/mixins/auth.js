import jwt from "jsonwebtoken"
import axios from "axios"
//import store from "../store/index";

export function isAuthenticated() {
    //--##  Validate first global state otherwise get the localstorage
    //console.log(store.state.auth)
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);    
    if (!data) return;
    return date < data.exp;
}

export const AuthMixin = {
    methods: {
        isAuthenticated
    }
}

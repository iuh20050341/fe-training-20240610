import axiosClient from "./axiosClient";
import { Login } from "../types/login.type"

const loginApi = {
    add(username: string, password: string){
        const url = "/auth/login";
        return axiosClient.post<Login>(url, {username, password})
    }
};
export default loginApi;

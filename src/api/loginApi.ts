import axiosClient from "./axiosClient";
import { Login, Logins } from "../types/login.type"

const loginApi = {
    add(data: Logins){
        const url = "/auth/login";
        return axiosClient.post(url, data)
    }
};
export default loginApi;

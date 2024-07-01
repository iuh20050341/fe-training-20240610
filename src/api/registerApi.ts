import axiosClient from "./axiosClient";
import { Register } from "../types/register.type"

const registerApi = {
    add(data: Omit<Register, "id" | "createdAt">){
        const url = "/auth/register";
        return axiosClient.post<Register>(url, data)
    }
};
export default registerApi;

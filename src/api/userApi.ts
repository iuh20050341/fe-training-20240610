import axiosClient from "./axiosClient";
import { Users } from "../types/user.type"

const userApi = {
    getAll(){
        const url = "/users";
        return axiosClient.get<Users[]>(url)
    },
    get(id: number | string){
        const url = `/users/${id}`;
        return axiosClient.get<Users>(url)
    },
    add(data: Omit<Users, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>){
        const url = "/users";
        return axiosClient.post<Users>(url, data)
    },
    update(id: number | string, data: Users){
        const url = `/users/${id}`;
        return axiosClient.put<Users>(url, data)
    },
    remove(id: number | string){
        const url = `/users/${id}`;
        return axiosClient.delete<{}>(url)
    }
};


export default userApi;

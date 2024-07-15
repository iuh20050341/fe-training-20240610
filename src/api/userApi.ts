import axiosClient from "./axiosClient";
import { Users, User } from "../types/user.type"

const userApi = {
    getAll(){
        const url = "/users";
        return axiosClient.get(url)
    },
    get(id: number | string){
        const url = `/users/${id}`;
        return axiosClient.get(url)
    },
    add(data: Omit<Users, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>){
        const url = "/users";
        return axiosClient.post<Users>(url, data)
    },
    update(data: User){
        const url = `/users`;
        return axiosClient.put(url, data)
    },
    remove(id: number | string){
        const url = `/users/${id}`;
        return axiosClient.delete<{}>(url)
    }
};


export default userApi;

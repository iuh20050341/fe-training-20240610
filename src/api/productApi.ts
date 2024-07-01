import axiosClient from "./axiosClient";
import { Book, Books } from "../types/book.type"

const productApi = {
    getAll(){
        const url = "/books";
        return axiosClient.get<Book[]>(url)
    },
    get(id: number | string){
        const url = `/books/${id}`;
        return axiosClient.get<Books>(url)
    },
    add(data: Omit<Books, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>){
        const url = "/books";
        return axiosClient.post<Books>(url, data)
    },
    update(id: number | string, data: Books){
        const url = `/books/${id}`;
        return axiosClient.put<Books>(url, data)
    },
    remove(id: number | string){
        const url = `/books/${id}`;
        return axiosClient.delete<{}>(url)
    }
};


export default productApi;

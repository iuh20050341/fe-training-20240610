import axiosClient from "./axiosClient";
import { Book, Books } from "../types/book.type"

const productApi = {
    getAll(){
        const url = "/books";
        return axiosClient.get(url)
    },
    get(id: number | string){
        const url = `/books/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url = "/books";
        return axiosClient.post(url, data)
    },
    update(data){
        const url = `/books`;
        return axiosClient.put(url, data)
    },
    remove(id: number | string){
        const url = `/books/${id}`;
        return axiosClient.delete<{}>(url)
    }
};

export default productApi;

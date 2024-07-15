import axiosClient from "./axiosClient";

const ticketdetailApi = {
    getAll(){
        const url = "/ticketDetails ";
        return axiosClient.get(url)
    },
    get(id: number | string){
        const url = `/ticketDetails/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url = "/ticketDetails";
        return axiosClient.post(url, data)
    },
    update(data){
        const url = `/ticketDetails`;
        return axiosClient.put(url, data)
    },
    remove(id: number | string){
        const url = `/ticketDetails/${id}`;
        return axiosClient.delete<{}>(url)
    }
};

export default ticketdetailApi;

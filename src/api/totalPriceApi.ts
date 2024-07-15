import axiosClient from "./axiosClient";
//http://localhost:8080/api/v1/tickets/118/totalPrices
const totalApi = {
    total(id: number | string){
        return axiosClient.get(`ticket/${id}/totalPrices`)
    }
};
export default totalApi;

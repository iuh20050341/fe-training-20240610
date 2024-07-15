import axiosClient from "./axiosClient";

// export const getStudents = (page: number | string, limit: number | string) =>
//     http.get<Students>('students', {
//       params: {
//         _page: page,
//         _limit: limit
//       }
//     })
const ticketApi = {
    getAll(pageNumber: number, pageSize: number){
        const url = "/tickets";
        return axiosClient.get(url, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize
            }
        });
    },

    // getAll(){
    //     const url = "/tickets ";
    //     return axiosClient.get(url)
    // },
    
    get(id: number | string){
        const url = `/tickets/${id}`;
        return axiosClient.get(url)
    },
    add(data){
        const url = "/tickets";
        return axiosClient.post(url, data)
    },
    update(data){
        const url = `/tickets`;
        return axiosClient.put(url, data)
    },
    remove(id: number | string){
        const url = `/tickets/${id}`;
        return axiosClient.delete<{}>(url)
    }
};

export default ticketApi;

import axios from "axios"


const axiosClient = axios.create({
    baseURL:"http://10.66.6.33:8080/api/v1",
    headers:{
        'Content-Type': "application/json",
    }
})

//Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Thêm token vào header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosClient;
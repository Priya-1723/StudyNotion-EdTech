import axios from 'axios'; //Axios is imported to handle HTTP requests such as GET, POST, PUT, DELETE, etc.

export const axiosInstance = axios.create({
    withCredentials: true,
    // baseURL: API_BASE_URL,
}) //allows creating a custom Axios instance with pre-configured settings like base URL, default headers, etc.

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log('Headers:', headers)
    return axiosInstance({
        method: `${method}`, // (e.g., GET, POST, PUT, DELETE)
        url: `${url}`, //The endpoint to which the request is sent.
        data: bodyData ? bodyData : null, //The data to send in the body of the request (mainly used for POST or PUT
        headers : headers ? headers: null, //Optional custom headers for the request
        params: params ? params: null, //Optional query parameters to be appended to the URL
        
    });
}
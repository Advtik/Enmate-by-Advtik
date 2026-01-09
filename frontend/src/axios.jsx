import axios from "axios";

const makeRequest=axios.create({
    baseURL: "http://192.168.1.5:8800/api/",
    withCredentials:true,
})  

export default makeRequest;
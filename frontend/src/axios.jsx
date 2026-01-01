import axios from "axios";

const makeRequest=axios.create({
    baseURL: "http://10.176.215.70:8800/api/",
    withCredentials:true,
})  

export default makeRequest;
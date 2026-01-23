import axios from "axios";

const makeRequest=axios.create({
    baseURL: "https://enmate-by-advtik.onrender.com/api/",
    withCredentials:true,
})  

export default makeRequest;
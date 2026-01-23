import {io} from "socket.io-client";

export const socket=io("https://enmate-by-advtik.onrender.com",{
    withCredentials:true,
    autoConnect:false
});
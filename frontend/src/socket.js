import {io} from "socket.io-client";

export const socket=io("http://192.168.1.40:8800",{
    withCredentials:true,
    autoConnect:false
});
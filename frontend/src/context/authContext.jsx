import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();
import { socket } from "../socket";

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async(inputs) => {
    const res=await axios.post("https://enmate-by-advtik.onrender.com/api/auth/login",inputs,{
      withCredentials:true,
    })
    setCurrentUser(res.data);
  };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  useEffect(()=>{
    if(currentUser){
      socket.connect();
    }
    else{
      socket.disconnect();
      console.log("disconnected");
    }
  },[currentUser]);
  
  useEffect(()=>{
    if(currentUser){
      socket.emit("addUser",currentUser.id);
    }
  },[currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser,setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
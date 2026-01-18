import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import  Available  from "./pages/available/Available";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Network from "./pages/network/Network";


function App() {
  const queryClient = new QueryClient();
  const {currentUser}=React.useContext(AuthContext);
  const {darkMode} = React.useContext(DarkModeContext); 
  const Layout=()=>{
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode? "dark" : "light"}`}>
          <Navbar></Navbar>
          <div style={{display:"flex", flexDirection:"row"}}>
            <Leftbar></Leftbar>
            <Outlet></Outlet>
            <Rightbar></Rightbar>
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"></Navigate>
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
          <Layout></Layout>
        </ProtectedRoute>,
      children: [
        {
          path:"/",
          element:<Home></Home>
        },
        {
          path:"/profile/:id",
          element:<Profile></Profile>
        },
        {
          path:"/available",
          element:<Available></Available>
        },
        {
          path:"/network",
          element:<Network></Network>
        }
      ]
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App

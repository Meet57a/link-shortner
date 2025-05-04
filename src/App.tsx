import { data, RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./lib/routes";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./providers/store";
import { useEffect, useState } from "react";
import { useToast } from "./hooks/use-toast";
import { setUser } from "./services/auth-services";
import { fetchLikes, setLikes } from "./services/fetch-service";
import { fetchUrl } from "./services/url-services";
import { jwtDecode } from 'jwt-decode';
import { LocalStoreClear } from "./lib/local-store";


function App() {
  const dispatch = useDispatch<AppDispatch>();


  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  useEffect(() => {

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        LocalStoreClear();
      } else if (token && !isTokenExpired(token)) {
        dispatch(setUser());
        dispatch(fetchLikes());
        dispatch(fetchUrl());
        dispatch(setLikes());
      }
    } else {
      dispatch(fetchLikes());
      dispatch(setUser());
      dispatch(setLikes());
      LocalStoreClear();

    }

  }, [localStorage.getItem('token')]);



  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;

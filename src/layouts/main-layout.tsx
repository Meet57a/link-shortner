import React, { useEffect } from "react";
import Header from "../components/header/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/providers/store";
import { fetchUrl } from "@/services/url-services";

const MainLayout = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth)



  useEffect(() => {
    if (data && data.msg === "jwt expired") {
      navigate("/");
    }
    
  }, [data]);
  return (
    <div>
      <main className="min-h-screen">   
        <Header />
        <Outlet />
      </main>
      <footer>Made with ❤️ by Meet</footer>
    </div>
  );
};

export default MainLayout;

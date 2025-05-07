import React, { useEffect } from "react";
import Header from "../components/header/header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/providers/store";
import { fetchUrl } from "@/services/url-services";
import { MailIcon } from "lucide-react";

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
      <main className="min-h-screen max-sm:h-full">   
        <Header />
        <Outlet />
      </main>
      <footer className="flex justify-between p-4 ">
        <div>Made with ❤️ by Meet</div>
        <div>
          <MailIcon size={24} className="cursor-pointer" onClick={
            () => {
              window.location.href = "mailto:meetsenjaliya9048@gmail.com"
            }
          }/>
        </div>
      </footer>

    </div>
  );
};

export default MainLayout;

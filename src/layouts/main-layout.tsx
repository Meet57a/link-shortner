import React from "react";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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

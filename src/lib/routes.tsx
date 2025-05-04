import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import LandingPage from "../pages/landing-page";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth";
import LinksCollections from "@/pages/links-collections";
import RedirectPage from "@/pages/redirect-page";
import About from "@/pages/about";

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <About /> }, 
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/linkscollection", element: <LinksCollections /> },
    ],
  },
  {
    element: <RedirectPage />,
    path: "/:shortUrl",
  }
]);

export default routes;

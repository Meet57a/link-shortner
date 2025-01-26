import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import LandingPage from "../pages/landing-page";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth";

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <div>About</div> },
      { path: "/dashboard", element: <Dashboard /> },
      {path:"/auth", element: <AuthPage />}
    ],
  },
]);

export default routes;

import { data, RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./lib/routes";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./providers/store";
import { useEffect } from "react";
import { useToast } from "./hooks/use-toast";
import { getSession, setUser } from "./services/auth-services";
import { fetchLikes, setLikes } from "./services/fetch-service";

function App() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { user, data, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const sessionHandler = async () => {
    const date = new Date();
    const expireIn = Number(localStorage.getItem("expireIn"));
    const token = localStorage.getItem("token");

    if (date.getMinutes() > expireIn && token) {
      localStorage.setItem("expireIn", ((date.getMinutes() + 20) % 60).toString());
      dispatch(getSession());
      dispatch(fetchLikes());
      dispatch(setUser());
    } else {
      dispatch(setUser());
      dispatch(setLikes());
      dispatch(fetchLikes());
    }
  };

  useEffect(() => {
    sessionHandler();
  }, []);
 
  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Loading",
        description: "Please wait...",
      });
    }
    if (data) {
      if (data.statusCode === 200) {
        toast({
          title: "Success",
          description: data.msg,
        });
      } else {
        toast({
          title: "Error",
          description: data.msg,
        });
      }
    }
  }, [data, isLoading]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;

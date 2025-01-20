import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./lib/routes";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./providers/store";
import { useEffect } from "react";
import { useToast } from "./hooks/use-toast";
import { getSession, setUser } from "./services/auth-services";
import AuthType from "./types/auth-type";

function App() {
  const { toast } = useToast();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  var data = useSelector((state: RootState) => state.auth.data);
  var user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const ses = async () => {
    var date = new Date();
    const expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn && date.getMinutes() > Number(expiresIn)) {
      localStorage.setItem("expiresIn", (date.getMinutes() + 20).toString());
      await dispatch(getSession());
    }
  };

  useEffect(() => {
    ses();
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        toast({
          title: "Getting session",
          description: "Please wait...",
        });
        data = null;
      }
      if (data != null && !isLoading) {
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
    })();
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      if (data != null) {
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
    })();
  }, [data]);
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;

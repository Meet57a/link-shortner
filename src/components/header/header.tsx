import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthPage from "@/pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/providers/store";
import { logout } from "@/services/auth-services";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { toast } = useToast();

  const location = useLocation();
  const locationActive = location.pathname;
  const user = useSelector(
    (state: RootState) => state.auth.user?.isAuthenticated
  );

  const data = useSelector((state: RootState) => state.auth.data);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
  };

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
            variant: "destructive",
          });
        }
      }
    })();
  }, [data]);

  return (
    <div className="text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-[20px]">
          Link <span className="text-yellow-500">Shortner</span>
        </Link>
        {!user ? (
          <p className="text-[12px]">
            <span className="text-yellow-500">100</span> Likes
          </p>
        ) : null}
      </div>
      <div className="flex gap-6">
        <Link
          to="/"
          className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${
            locationActive === "/" ? "after:scale-x-100" : "after:scale-x-0"
          } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${
            locationActive === "/about"
              ? "after:scale-x-100"
              : "after:scale-x-0"
          } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          About
        </Link>
      </div>
      {!user ? (
        <div className="flex gap-4">
          <AuthPage />
        </div>
      ) : (
        <div className="flex gap-4">
          <Button variant="outline" className="border-white ">
            <span className="text-yellow-500">100</span> Likes
          </Button>
          <Button variant="outline" className="border-red-900" onClick={onLogout}>
            {isLoading ? <div className="border h-[20px] w-[20px] border-t-white rounded-full animate-spin"></div> : "Log out"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
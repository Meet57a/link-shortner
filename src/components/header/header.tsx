import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthPage from "@/pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/providers/store";
import { likeService, logout } from "@/services/auth-services";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchLikes } from "@/services/fetch-service";

const Header = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const location = useLocation();
  const locationActive = location.pathname;
  const user = useSelector(
    (state: RootState) => state.auth.user?.isAuthenticated
  );
  var likes = useSelector((state: RootState) => state.fetch.likes);
  var data = useSelector((state: RootState) => state.auth.data);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
  };

  const onLike = () => {
    dispatch(likeService());
  };

  useEffect(() => {
    (async () => {
      if (data != null) {
        if (data.statusCode === 200) {
          toast({
            title: "Success",
            description: data.msg,
          });
          dispatch(fetchLikes());
          if (data.msg === "User session closed.") {
            navigate("/");
          }
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
    <>
      <div className="h-14"></div>
      <div className="text-white py-2 px-4 flex justify-between items-center fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <div>
          <Link to="/" className="text-[20px]">
            Link <span className="text-yellow-500">Shortner</span>
          </Link>
          {!user ? (
            <p className="text-[12px]">
              <span className="text-yellow-500">{likes}</span> Likes
            </p>
          ) : null}
        </div>
        <div className="flex gap-6">
          {user ? (
            <Link
              to="/dashboard"
              className={`max-sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/dashboard"
                ? "after:scale-x-100"
                : "after:scale-x-0"
                } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/"
              className={`max-sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/" ? "after:scale-x-100" : "after:scale-x-0"
                } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
            >
              Home
            </Link>
          )}
          {
            user ? (
              <Link
                to="/linkscollection"
                className={`max-sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/linkscollection"
                  ? "after:scale-x-100"
                  : "after:scale-x-0"
                  } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
              >
                Links
              </Link>
            ) : null
          }
          <Link
            to="/about"
            className={`max-sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/about"
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
            <Button variant="outline" className="border-white" onClick={onLike}>
              {isLoading ? (
                <div className="border h-[20px] w-[20px] border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="text-yellow-500">{likes} </span>
                  <span>Likes</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-red-900"
              onClick={onLogout}
            >
              {isLoading ? (
                <div className="border h-[20px] w-[20px] border-t-white rounded-full animate-spin"></div>
              ) : (
                "Log out"
              )}
            </Button>
          </div>
        )}
      </div>
      {user && <div className="text-center mt-2 mb-2 text-sm text-gray-500">
        Note : If data is not showing, please refresh the page or logout and login.
      </div>}
      {!user && <div className="flex gap-6 mt-6 mb-4 justify-center">
        <Link
          to="/"
          className={`sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/" ? "after:scale-x-100" : "after:scale-x-0"
            } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/about"
            ? "after:scale-x-100"
            : "after:scale-x-0"
            } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          About
        </Link>
      </div>}
      {user && <div className="flex gap-6 mt-4 mb-4 justify-center">
        <Link
          to="/dashboard"
          className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/dashboard"
            ? "after:scale-x-100"
            : "after:scale-x-0"
            } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          Dashboard
        </Link>
        <Link
          to="/linkscollection"
          className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/linkscollection"
            ? "after:scale-x-100"
            : "after:scale-x-0"
            } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          Links
        </Link>
        <Link
          to="/about"
          className={`sm:hidden relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-500 after:w-full ${locationActive === "/about"
            ? "after:scale-x-100"
            : "after:scale-x-0"
            } after:hover:scale-x-100 after:transition after:duration-300 after:origin-left`}
        >
          About
        </Link>
      </div>}
    </>

  );
};

export default Header;

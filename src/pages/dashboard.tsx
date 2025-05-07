import { Chart } from "@/components/dashboard/chart";
import CreateUrl from "@/components/forms/create-url";
import { RootState } from "@/providers/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const data = useSelector((state: RootState) => state.url.urlData)?.slice(0, 4);
  const isLoading = useSelector((state: RootState) => state.fetch.isLoading);
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (user && !user.isAuthenticated) {
      navigate("/");
    }
  }, [user]);

  return (
    isLoading ? <div className="flex justify-center items-center h-screen">
      <div className="border rounded-full w-[30px] h-[30px] border-t-white animate-spin"></div>
    </div> : <div className="h-screen border-2 bg-gray-900 mx-4 p-4 rounded-[10px] max-sm:h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Dashboard</h1>

        <CreateUrl />
      </div>
      <div className="flex gap-4 mt-4 max-sm:flex-col">
        <div className="flex gap-4  w-1/2 flex-col max-sm:w-full">
          <div className="flex w-full gap-4">
            <div className="p-4 bg-background rounded-[10px] border-2 border-gray-800 w-1/2 max-sm:w-full">
              <h1>Created Links</h1>
              <p>{data?.length}</p>
            </div>
            <div className="p-4 bg-background rounded-[10px] border-2 border-gray-800 w-1/2 max-sm:w-full">
              <h1>Total Clicks</h1>
              <p>0</p>
            </div>
          </div>
          <Chart />
        </div>
        <div className="flex flex-col gap-4 w-1/2 bg-background border-2 rounded-[10px] border-gray-800 p-4 max-sm:w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Recent Created Links</h1>
            <Link to="/linkscollection" className="text-sm text-blue-500 underline hover:text-yellow-500">View All</Link>
          </div>
          <div>
            {data && data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className="p-4 bg-background rounded-[10px] border-2 border-gray-800 mt-4">
                  <div className="truncate">{item.title}</div>
                  <div className="flex justify-between items-center ">
                    <Link to={import.meta.env.VITE_DOMAIN + item.shortUrl} className="text-xl  text-left truncate  text-blue-500 underline w-3/4 hover:text-yellow-500">{import.meta.env.VITE_DOMAIN + item.shortUrl}</Link>
                    <span className="text-muted-foreground">{item.currentTime.substring(0,5)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-muted-foreground">{item.currentDate}</span>
                    <span className="text-muted-foreground">Clicks : {item.clicks}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p>No recent created links</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

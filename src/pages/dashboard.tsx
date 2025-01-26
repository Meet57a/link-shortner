import { Chart } from "@/components/dashboard/chart";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-screen border-2 bg-gray-900 mx-4 p-4 rounded-[10px]">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="flex gap-4 mt-4">
        <div className="flex gap-4  w-1/2 flex-col">
          <div className="flex w-full gap-4">
            <div className="p-4 bg-background rounded-[10px] border-2 border-gray-800 w-1/2">
              <h1>Created Links</h1>
              <p>0</p>
            </div>
            <div className="p-4 bg-background rounded-[10px] border-2 border-gray-800 w-1/2">
              <h1>Total Clicks</h1>
              <p>0</p>
            </div>
          </div>
          <Chart />
        </div>
        <div className="flex flex-col gap-4 w-1/2 bg-background border-2 rounded-[10px] border-gray-800 p-4">
          <h1 className="text-xl">Recent Created Links</h1>
          <div>
            <div className="flex justify-between items-center border-b-2 border-gray-800 p-2">
              <p>
                <span>1. </span>https://google.com
              </p>
              <p>13:11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

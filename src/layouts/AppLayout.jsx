import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 bg-gray-100 w-full h-full">
          <div className="main-body container m-auto w-11/12 h-full flex flex-col">
            <NavBar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

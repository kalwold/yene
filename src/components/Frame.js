import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const Frame = () => {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
      <Sidebar />

        <div className="flex-1 flex flex-col sm:overflow-hidden sm:flex-row">
      
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    );
  };
export default Frame
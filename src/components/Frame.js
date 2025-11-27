import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const Frame = () => {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
      <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          {/* <div className="h-18">
            <Header />
          </div> */}
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Outlet/> {/* This will render the nested routes */}
          </div>
        </div>
      </div>
    );
  };
export default Frame
import React from "react";
import Sidebar from "./_sidebar/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <div className="md:w-64 fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
};

export default DashboardLayout;

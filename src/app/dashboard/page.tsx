import React from "react";
import AddForm from "./_component/add_form";

const DashboardPage = () => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <AddForm />
      </div>
    </div>
  );
};

export default DashboardPage;

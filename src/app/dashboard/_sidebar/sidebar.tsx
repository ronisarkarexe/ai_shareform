"use client";
import { Button } from "@/components/ui/button";
import { menuList } from "@/components/utils/sidebar/sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Sidebar = () => {
  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className="h-screen shadow-md bordered">
      <div className="p-3">
        {menuList.map((menu, index) => (
          <div
            className={`${
              path.includes(menu.path)
                ? "active:bg-primary text-white bg-primary"
                : "border-primary text-secondary"
            } flex gap-2 items-center border  py-2 px-3 mb-2 rounded-sm  hover:bg-primary hover:text-white cursor-pointer`}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </div>
        ))}
      </div>
      <div className="fixed bottom-5 w-64 p-3">
        <Button className="w-full">+ Create Form</Button>
      </div>
    </div>
  );
};

export default Sidebar;

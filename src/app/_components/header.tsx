"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const HeaderPage = () => {
  const path = usePathname();
  return (
    !path.includes("aiform") && (
      <div className="p-2 border-b shadow-sm flex items-center justify-between">
        <Image src={"/logo.svg"} width={50} height={30} alt="logo" />
        <Button>Get Started</Button>
      </div>
    )
  );
};

export default HeaderPage;

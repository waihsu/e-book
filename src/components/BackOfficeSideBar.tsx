"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { PiBooksFill } from "react-icons/pi";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function BackOfficeSideBar() {
  const params = useSearchParams();
  console.log(params.getAll("/backoffice"));

  const menuItems = [
    {
      id: 1,
      name: "Autor",
      route: "/backoffice/author",
      icon: <AiOutlineHome />,
    },
    {
      id: 2,
      name: "Categories",
      route: "/backoffice/categories",
      icon: <BiCategoryAlt />,
    },
    {
      id: 3,
      name: "Books",
      route: "/backoffice/books",
      icon: <PiBooksFill />,
    },
    {
      id: 4,
      name: "Chapters",
      route: "/backoffice/chapters",
      icon: <PiBooksFill />,
    },
  ];

  return (
    <div className="dark:bg-[#36363F]  w-60 h-96">
      <h4 className=" text-xl text-center mb-10">BackOffice</h4>
    <div className="flex flex-col justify-items-start items-center gap-3">
    {menuItems.map((item) => (
        <Link href={item.route} key={item.id} className="w-full justify-items-start px-2">
          <p className=" flex items-center gap-2 py-2 px-3  shadow-md hover:shadow-emerald-400 dark:hover:shadow-red-800">
            {item.icon}
            {item.name}
          </p>
        </Link>
      ))}
    </div>
    </div>
  );
}

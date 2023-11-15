import Link from "next/link";
import React from "react";

import { Session, getServerSession } from "next-auth";
import PopoverAvatar from "./PopoverAvatar";
import Menu from "./Menu";
import { ThemeIcon } from "./ThemeIcon";
import {motion} from 'framer-motion'



const menuItems = [
  {
    id: 1,
    name: "HOME",
    route: "/",
  },
  {
    id: 2,
    name: "FREE",
    route: "/books/free-books",
  },
  {
    id: 3,
    name: "PREMIUM",
    route: "/books/premium-books",
  },
  {
    id: 4,
    name: "AUTHORS",
    route: "/authors",
  },
  {
    id: 5,
    name: "ABOUT",
    route: "/about",
  },
];

export default async function Navbar() {

  const session = await getServerSession()

 
  return (
    <div>
      <div className="flex justify-between items-center py-6 px-10 ">
        <Link href={"/"}>
        <h4 className="text-2xl hover:scale-110 transition delay-150 duration-500">Library</h4></Link>
        <div className=" gap-10 hidden sm:flex overflow-hidden">
          {menuItems.map((item) => (
            <Link href={item.route} key={item.id} className="group flex flex-col relative">
              {" "}
              <p className="  hover:transform group-hover:-translate-y-10 transition delay-100 duration-500">{item.name}</p>
              <p className=" absolute text-[#BDE673] hover:transform translate-y-32 group-hover:translate-y-0 transition duration-500">{item.name}</p>
            </Link>
            
          ))}
        </div>
        <div className=" flex gap-2">
          <ThemeIcon />
        <div >
          <PopoverAvatar session={session as Session} />
          
        </div>
        <div className=" flex sm:hidden" >
          <Menu />
        </div>
        </div>
      </div>
    </div>
  );
}

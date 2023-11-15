import Link from "next/link";
import React from "react";

import { Session, getServerSession } from "next-auth";
import PopoverAvatar from "./PopoverAvatar";
import Menu from "./Menu";
import { ThemeIcon } from "./ThemeIcon";



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
        <h4 className="text-2xl font-semibold">Library</h4>
        <div className="gap-10 hidden sm:flex">
          {menuItems.map((item) => (
            <Link href={item.route} key={item.id}>
              {" "}
              <span>{item.name}</span>
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

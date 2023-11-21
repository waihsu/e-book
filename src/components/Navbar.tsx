import Link from "next/link";
import React from "react";

import { Session, getServerSession } from "next-auth";
import PopoverAvatar from "./PopoverAvatar";
import Menu from "./Menu";
import { ThemeIcon } from "./ThemeIcon";
import {motion} from 'framer-motion'
import NaveMenuItems from "./NaveMenuItems";





export default async function Navbar() {

  const session = await getServerSession()

 
  return (
    <div>
      <div className="flex justify-between items-center py-6 px-10 ">
        <Link href={"/"}>
        <h4 className="text-2xl hover:scale-110 transition delay-150 duration-500">Library</h4></Link>
        <NaveMenuItems />
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

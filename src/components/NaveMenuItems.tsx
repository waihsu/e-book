'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

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

export default function NaveMenuItems() {
    const pathName = usePathname()
    console.log(pathName)
  return (
    <div className=" gap-10 hidden sm:flex">
          {menuItems.map((item) => (
            <Link href={item.route} key={item.id} className="group flex flex-col relative">
              {" "}
              <p className={pathName === item.route ? " hover:drop-shadow-2xl rounded-sm shadow-lg shadow-emerald-400 dark:shadow-red-800 text-emerald-400 py-2 px-3 transition delay-100 duration-200" : "shadow-md dark:hover:shadow-red-800 hover:shadow-emerald-400 hover:text-emerald-400 rounded-sm py-2 px-3 transition delay-100 duration-200"}>{item.name}</p>
              {/* <p className="shadow-md hover:shadow-red-800 py-2 px-3 absolute text-black hover:transform translate-y-32 group-hover:translate-y-0 transition duration-500">{item.name}</p> */}
            </Link>
            
          ))}
        </div>
  )
}

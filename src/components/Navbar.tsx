import Link from "next/link";
import React from "react";

export default function Navbar() {
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
      name: "ACCOUNT",
      route: "/account",
    },
  ];
  return (
    <div>
      <div className="flex justify-between py-8 px-10 ">
        <h4 className="text-2xl font-semibold">E-BOOK</h4>
        <div className="gap-10 hidden sm:flex">
          {menuItems.map((item) => (
            <Link href={item.route} key={item.id}>
              {" "}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

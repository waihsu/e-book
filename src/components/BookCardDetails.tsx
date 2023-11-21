"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Author, Books, Chapters, User } from "@prisma/client";
import { BsFillCalendar2XFill } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BookCardDetails({
  book,
  authors,
  chapters,
}: {
  book: Books;
  authors: Author[];
  chapters: Chapters[];
}) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const authorName = (id: string) => {
    return authors.filter((author) => author.id === id)[0]?.name;
  };
  return (
    <div>
      <Card className="w-full mx-auto md:px-20 md:py-10 dark:bg-[#36363F] flex flex-wrap md:flex-nowrap mb-10">
        <div className=" w-full md:max-w-2xl bg-orange-300">
        <Image src={book.asset_url} alt="bookImage" width={1000} height={1} className=" min-w-full h-full" />
        </div>

        <div className=" p-2 mx-auto min-w-fit">
          <h1 className=" text-xs md:text-2xl md:font-extrabold">Title: {book.title}</h1>
          <h3 className=" text-xs md:text-lg">Author: {authorName(book.author_id)}</h3>
        </div>
      </Card>
      <div className=" grid grid-cols-2">
        {chapters.map((chapter,index) => (
          <Link href={`/books/${book.id}/${chapter.id}`} key={chapter.id}>
            <Card className=" flex items-center p-2">
              <div className="w-1/2 rounded-md overflow-hidden">
              <Image src={book.asset_url} alt="bookImage" width={100} height={100} className=" min-w-full min-h-full" />
              </div>
            
             <div className="w-1/2">
             <h3 className=" text-center">{chapter.title}</h3>
             </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

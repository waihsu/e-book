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
import BookCard from "./BookCard";
import { Divider } from "@mui/material";

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
      <Card className=" relative h-96">
        <Image
          src={book.asset_url}
          alt="bookImage"
          quality={100}
          sizes="100vw"
          fill
          style={{ objectFit: "cover" }}
        />
      </Card>
      <div className=" p-2 mx-auto min-w-fit">
        <h1 className=" text-xs md:text-2xl md:font-extrabold">
          Title: {book.title}
        </h1>
        <h3 className=" text-xs md:text-lg">
          Author: {authorName(book.author_id)}
        </h3>
      </div>

      <h2 className=" text-center text-4xl font-extrabold mb-10 ">Chapters</h2>
      
      <div className=" grid grid-cols-2">
        {chapters.map((chapter, index) => (
          <Link href={`/books/${book.id}/${chapter.id}`} key={chapter.id} className=" grid grid-cols-2 items-center">
            <div>
              <Card className=" relative max-w-xs h-20">
                <Image
                  src={book.asset_url}
                  alt="bookImage"
                  quality={100}
                  sizes="100vw"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Card>

              
            </div>
            <div className="w-1/2">
                <h3 className=" text-center">{chapter.title}</h3>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

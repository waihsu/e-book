
import { Author, Books } from "@prisma/client";
import React, { useState } from "react";

import Image from "next/image";

import { Card, Inset } from "@radix-ui/themes";
import Link from "next/link";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const childVariants = {
  hidden: { opacity: 0, y: 100 },
  hover: { opacity: 0.9, y: 0,  transition: { duration: 0.3,delay: 0.3 }, },
};

export default function BookCard({
  book,
}: {
  book: Books;
}) {

  return (
    <Link href={`/books/${book.id}`}>
      <Card className=" md:w-[350px] h-[500px]">
        <div className="relative h-3/4 ">
          <Image
            src={book.asset_url}
            alt="bookImage"
            quality={100}
            sizes="100vw"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}


import { Author, Books } from "@prisma/client";
import React, { useState } from "react";

import Image from "next/image";

import { Card, Inset } from "@radix-ui/themes";
import Link from "next/link";

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
   <Card className=" relative h-96">
        <Image src={book.asset_url} alt="bookImage" quality={100} sizes="100vw" fill style={{objectFit: "cover"}}  />
      </Card>
   </Link>
  );
}

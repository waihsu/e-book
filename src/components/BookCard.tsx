
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
     <Card style={{ maxWidth: 280, backgroundColor: "red" }}>
    <Inset clip="padding-box">
      <Image src={book.asset_url} alt="bookImage" width={280} height={170} className=" min-w-full min-h-full" />
    </Inset>
    
  </Card>
   </Link>
  );
}

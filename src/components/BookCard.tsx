
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
  authors,
}: {
  book: Books;
  authors: Author[];
}) {

  const authorName = (id: number) => {
    return authors.filter((author) => author.id === id)[0]?.name;
  };
  return (
   <Link href={`/books/${book.id}`}>
     <Card size="2" style={{ maxWidth: 280, backgroundColor: "red" }}>
    <Inset clip="padding-box" side="top" pb="current">
      <Image src={book.asset_url} alt="bookImage" width={280} height={170} />
    </Inset>
    
  </Card>
   </Link>
  );
}

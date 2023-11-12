"use client";
import { Author, Books } from "@prisma/client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import { Card, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

const childVariants = {
  hidden: { opacity: 0 },
  hover: { opacity: 0.9, transition: { duration: 0.3,delay: 0.3 } },
};

export default function BookCard({
  book,
  authors,
}: {
  book: Books;
  authors: Author[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const authorName = (id: number) => {
    return authors.filter((author) => author.id === id)[0]?.name;
  };
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full">
      <Image
        src={book.asset_url}
        className={
          isHovered
            ? "scale-125 transition ease-in-out duration-500 delay-100"
            : "scale-100 transition  ease-in-out duration-500 delay-100"
        }
        alt="bookImage"
        layout="responsive"
        loading="lazy"
        quality={90}
        width={0}
        height={0}
      />
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate={isHovered ? "hover" : "hidden"}
        className="w-full h-full  rounded-none absolute top-0 right-0 flex flex-col justify-center items-center select-none">
        
        <CardTitle className="text-black mb-4">Author: {authorName(book.author_id)}</CardTitle>
        <Link href={`/books/${book.id}`}>
          <Button className="bg-red-500">View Details</Button>
        </Link>
        
      </motion.div>
      <Link className="flex sm:hidden absolute bottom-0" href={`/books/${book.id}`}>
          <Button className="bg-red-500">View Details</Button>
        </Link>
    </motion.div>
  );
}

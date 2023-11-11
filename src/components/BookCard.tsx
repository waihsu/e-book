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
      style={{ width: 400, position: "relative", overflow: "hidden" }}>
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
        className="w-full h-full bg-[#9F9FA5] rounded-none absolute top-0 right-0 flex flex-col justify-center items-center">
        
        <CardTitle className="text-black mb-4">Author: {authorName(book.author_id)}</CardTitle>
        <Link href={`/books/${book.id}`}>
          <Button className="bg-red-500">View Details</Button>
        </Link>
        
      </motion.div>
    </motion.div>
  );
}

"use client";
import React, { useState } from "react";
import { Author, Books, Categories, Categories_Books } from "@prisma/client";
import BookCard from "./BookCard";
import * as Tabs from '@radix-ui/react-tabs';
import { Card } from "./ui/card";
;

export default function BookCategoriesTabs({
  authors,
  categories,
  books,
  categories_books,
}: {
  authors: Author[];
  categories: Categories[];
  books: Books[];
  categories_books: Categories_Books[];
}) {
  const [selectCategoryId, setSelectCategoryId] = useState<string>("all");

  const selectedCategoryByBookIds = categories_books
    .filter((item) => item.categories_id === selectCategoryId)
    .map((item) => item.books_id);
  console.log(selectedCategoryByBookIds);
  const selectedCategoryByBooks = books.filter((item) =>
    selectedCategoryByBookIds.includes(item.id)
  );

  return (
    <Tabs.Root defaultValue="all"  className=" relative">
     
     
     <Tabs.List className="flex gap-3 px-4 overflow-scroll scrollbar-none">
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        {categories.map((item) => (
          <Tabs.Trigger
            onClick={() => setSelectCategoryId(String(item.id))}
            value={String(item.id)}
            key={item.id}>
            {item.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
     
     
      <div className=" grid md:grid-cols-4 space-y-4 ">
      {books.map((item) => (
            <Tabs.Content value="all" key={item.id} className="w-full md:w-52">
              <BookCard book={item}  />
            </Tabs.Content>
          ))}
          {selectedCategoryByBooks.map((item) => (
            <Tabs.Content value={selectCategoryId as string} key={item.id} className="w-full md:w-32">
              <BookCard book={item} />
            </Tabs.Content>
          ))}
      </div>
    </Tabs.Root>
  );
}

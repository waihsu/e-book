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
  const [selectCategoryId, setSelectCategoryId] = useState<string>();

  const selectedCategoryByBookIds = categories_books
    .filter((item) => item.categories_id === Number(selectCategoryId))
    .map((item) => item.books_id);
  console.log(selectedCategoryByBookIds);
  const selectedCategoryByBooks = books.filter((item) =>
    selectedCategoryByBookIds.includes(item.id)
  );

  return (
    <Tabs.Root defaultValue="all"  className=" relative">
     <div className=" w-fit absolute right-0">
     <Card className="bg-[#393945]">
     <Tabs.List style={{ width: 300,display: "flex", flexDirection: 'column', justifyContent: "center" ,alignItems: "center", gap: 10, textAlign: "start", padding: "16px 0"}}>
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        {categories.map((item) => (
          <Tabs.Trigger
          className=""
            onClick={() => setSelectCategoryId(String(item.id))}
            value={String(item.id)}
            key={item.id}>
            {item.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
     </Card>
     </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-10 max-w-5xl ">
      {books.map((item) => (
            <Tabs.Content value="all" key={item.id}>
              <BookCard book={item} authors={authors} />
            </Tabs.Content>
          ))}
          {selectedCategoryByBooks.map((item) => (
            <Tabs.Content value={selectCategoryId as string} key={item.id}>
              <BookCard book={item} authors={authors} />
            </Tabs.Content>
          ))}
      </div>
    </Tabs.Root>
  );
}

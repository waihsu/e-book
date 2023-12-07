import BookCard from '@/components/BookCard';
import { prisma } from '@/libs/prisma';
import React from 'react'

export default async function page({params}: {params: {id: string}}) {
    const {id} = params
    const categoriesBooks = await prisma.categories_Books.findMany({
      where: { categories_id: id },
    });
    const categoryByBookIds = categoriesBooks.map((item) => item.books_id);
    const books = await prisma.books.findMany({
      where: { id: { in: categoryByBookIds } },
    });
  return (
    <div className=" grid md:grid-cols-3 space-y-4 space-x-4 ">
      {books.map((item) => (
        <BookCard book={item} key={item.id} />
      ))}
    </div>
  );
}

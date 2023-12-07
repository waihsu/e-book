import { prisma } from '@/libs/prisma'
import { Author } from '@prisma/client'
import React from 'react'
import BookSlider from './BookSlider'

export default async function CategoryByBookSlider({id,authors}: {id: string,authors: Author[]}) {
    const categoriesBooks = await prisma.categories_Books.findMany({where: {categories_id: id}})
    const categoryByBookIds = categoriesBooks.map(item => item.books_id) 
    const books = await prisma.books.findMany({where: {id: {in: categoryByBookIds}}})
    // console.log(books)
  return (
    <div><BookSlider authors={authors} books={books} /></div>
  )
}

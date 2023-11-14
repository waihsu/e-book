import React from 'react'
import BookCategoriesTabs from '@/components/BookCategoriesTabs'
import { prisma } from '@/libs/prisma'


export default async function PremiumBooks() {
  const books = await prisma.books.findMany({where: {is_premium: true}})
    const categories = await prisma.categories.findMany({where: {is_archived: false}})
    const categoreis_books = await prisma.categories_Books.findMany({where:{is_archived: false}})
    const authors = await prisma.author.findMany()
  return (
    <div className=''>
    <BookCategoriesTabs categories={categories} books={books} categories_books={categoreis_books} authors={authors} />
</div>
  )
}

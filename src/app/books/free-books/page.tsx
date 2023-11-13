import BookCategoriesTabs from '@/components/BookCategoriesTabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prisma } from '@/libs/prisma'
import React from 'react'


export default async function FreeBooks() {
    const books = await prisma.books.findMany({where: {is_premium: false}})
    const categories = await prisma.categories.findMany({where: {is_archived: false}})
    const categoreis_books = await prisma.categories_Books.findMany({where:{is_archived: false}})
    const authors = await prisma.author.findMany()
  return (
    <div className=''>
        <BookCategoriesTabs categories={categories} books={books} categories_books={categoreis_books} authors={authors} />
    </div>
  )
}

import React from 'react'
import { EditBookForm } from './EditBookForm'
import { prisma } from '@/libs/prisma'
import { Author, Books } from '@prisma/client'

export default async function EditBook({params}: {params: {id: number}}) {
    const {id} = params
    const book = await prisma.books.findFirst({where: {id: Number(id)}})
    const categoriesBooks = await prisma.categories_Books.findMany({where: {books_id: Number(id), is_archived: false}})
    const connectedCategoryIds = categoriesBooks.map(item => item.categories_id)
    // const connectedCategories = await prisma.categories.findMany({where: {id: {in: connectedCategoryIds}}})
    const allCategories = await prisma.categories.findMany({where: {is_archived: false}})
    const author = await prisma.author.findFirst({where: {id: book?.author_id}})
    const validConnectedCategoryIds = allCategories.filter(item => connectedCategoryIds.includes(item.id)).map(item => item.id)
  return (
    <div>
        <EditBookForm book={book as Books} categories={allCategories} author={author as Author} connectedCategoryIds={validConnectedCategoryIds} />
    </div>
  )
}

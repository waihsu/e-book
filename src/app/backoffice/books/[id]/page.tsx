import React from 'react'
import { EditBookForm } from './EditBookForm'
import { prisma } from '@/libs/prisma'
import { Author, Books } from '@prisma/client'
import BackofficeLayout from '@/components/BackofficeLayout'

export default async function EditBook({params}: {params: {id: string}}) {
    const {id} = params
    console.log(typeof id)
    const book = await prisma.books.findFirst({where: {id: id}})
    const categoriesBooks = await prisma.categories_Books.findMany({where: {books_id: id, is_archived: false}})
    const connectedCategoryIds = categoriesBooks.map(item => item.categories_id)
    // const connectedCategories = await prisma.categories.findMany({where: {id: {in: connectedCategoryIds}}})
    const allCategories = await prisma.categories.findMany({where: {is_archived: false}})
    const author = await prisma.author.findFirst({where: {id: book?.author_id}})
    const validConnectedCategoryIds = allCategories.filter(item => connectedCategoryIds.includes(item.id)).map(item => item.id)
  return (
    <BackofficeLayout title='Edit Book' link='/backoffice/books' button='Back'>
        <EditBookForm book={book as Books} categories={allCategories} author={author as Author} connectedCategoryIds={validConnectedCategoryIds} />
    </BackofficeLayout>
  )
}

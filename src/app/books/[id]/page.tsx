import BookCardDetails from '@/components/BookCardDetails'
import { prisma } from '@/libs/prisma'
import { Books } from '@prisma/client'
import React from 'react'

export default async function BookDetails({params}: {params: {id:string}}) {
    const {id} = params
    const book = await prisma.books.findFirst({where: {id: id}})
    const authors = await prisma.author.findMany()
    const chapters = await prisma.chapters.findMany({where: {book_id: id}})
  return (
    <div>
        <BookCardDetails chapters={chapters} book={book as Books} authors={authors}/>
    </div>
  )
}

import BookCardDetails from '@/components/BookCardDetails'
import { prisma } from '@/libs/prisma'
import { Books } from '@prisma/client'
import React from 'react'

export default async function BookDetails({params}: {params: {id:number}}) {
    const {id} = params
    const book = await prisma.books.findFirst({where: {id: Number(id)}})
    const authors = await prisma.author.findMany()
  return (
    <div>
        <BookCardDetails book={book as Books} authors={authors}/>
    </div>
  )
}

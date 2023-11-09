import React from 'react'
import { BookForm } from './Form'
import { prisma } from '@/libs/prisma'

export default async function page() {

  const authors = await prisma.author.findMany()

  return (
    <div>
      <div>
        <BookForm authors={authors} />
      </div>
    </div>
  )
}

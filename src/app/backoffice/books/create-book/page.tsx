import BackofficeLayout from '@/components/BackofficeLayout'
import React from 'react'
import { BookForm } from './Form'
import { prisma } from '@/libs/prisma'

export default async function CreateBook() {
    const authors = await prisma.author.findMany()
  const categories = await prisma.categories.findMany()
  return (
    <BackofficeLayout title='Create Book' link='/backoffice/books' button='Back'>
        <BookForm authors={authors} categories={categories} />
    </BackofficeLayout>
  )
}

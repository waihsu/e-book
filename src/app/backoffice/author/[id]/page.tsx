import BackofficeLayout from '@/components/BackofficeLayout'
import React from 'react'
import { EditAuthrForm } from './EditAuthorForm'
import { prisma } from '@/libs/prisma'
import { Author } from '@prisma/client'

export default async function EditAuthor({params}: {params: {id: string}}) {
    const {id} = params
    const author = await prisma.author.findFirst({where: {id:id}})
console.log(author)
  return (
    <BackofficeLayout title='Edit Author' link='/backoffice/author' button='Back'>
        <EditAuthrForm author={author as Author} />
    </BackofficeLayout>
  )
}

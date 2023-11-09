import BackofficeLayout from '@/components/BackofficeLayout'
import React from 'react'
import { EditCategoryForm } from './EditCategoryForm'
import { prisma } from '@/libs/prisma'
import { Categories } from '@prisma/client'

export default async function EditCategory({params}: {params: {id: number}}) {
    const {id} = params
    const category = await prisma.categories.findFirst({where: {id: Number(id)}})
  return (
    <BackofficeLayout title='Edit Category' link='/backoffice/categories' button='Back'>
        <EditCategoryForm category={category as Categories} />
    </BackofficeLayout>
  )
}

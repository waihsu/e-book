import React from 'react'
import { CategoriesForm } from './Form'
import BackofficeLayout from '@/components/BackofficeLayout'

export default function CreateCategory () {
  return (
    <BackofficeLayout title='Create Category' link='/backoffice/categories' button='Back'>
        <CategoriesForm />
        </BackofficeLayout>
  )
}

import BackofficeLayout from '@/components/BackofficeLayout'
import React from 'react'
import { AuthorForm } from './Form'

export default function CreateAuthor() {
  return (
    <BackofficeLayout title='Create Author' link='/backoffice/author' button='Back'>
        <AuthorForm />
    </BackofficeLayout>
  )
}

import React from 'react'
import ChapterForm from './ChapterForm'
import BackofficeLayout from '@/components/BackofficeLayout'

export default function page({params}: {params: any}) {
    const {bookId} = params
    
  return (
    <BackofficeLayout title='Create Chpater' link={`/backoffice/chapters/${bookId}`} button='Back'>
      <ChapterForm bookId={bookId}/>
    </BackofficeLayout>
  )
}

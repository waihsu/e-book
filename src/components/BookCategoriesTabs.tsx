'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Author, Books, Categories, Categories_Books } from '@prisma/client';
import BookCard from './BookCard';

export default function BookCategoriesTabs({authors,categories,books,categories_books}: {authors: Author[],categories: Categories[], books: Books[], categories_books: Categories_Books[]}) {

    const [selectCategoryId, setSelectCategoryId] = useState<string>();

    const selectedCategoryByBookIds = categories_books.filter(item => item.categories_id === Number(selectCategoryId)).map(item => item.books_id)
    console.log(selectedCategoryByBookIds)
    const selectedCategoryByBooks = books.filter(item => selectedCategoryByBookIds.includes(item.id))
    
  return (
    <div className=' relative'>
        <Tabs defaultValue="all">
      <TabsList className=" h-fit p-4">
        <p className='text-xl font-bold mb-2 mr-2 text-[#BDE673]'>Free Books</p>
        <TabsTrigger value='all' ><span className='text-lg'>All Books</span></TabsTrigger>
        {categories.map(item => (
            <TabsTrigger value={String(item.id)} key={item.id} onClick={() => setSelectCategoryId(String(item.id))}><span className='text-lg'>{item.name}</span></TabsTrigger>
        ))}
        
      </TabsList>
      <div className="grid w-full grid-cols-2">
      {books.map(item => (
        <TabsContent key={item.id} value="all" className=' text-right'><BookCard book={item} authors={authors} /></TabsContent>
      ))}
      </div>
      <div>
      {selectedCategoryByBooks.map(item => (
        <TabsContent key={item.id} value={selectCategoryId as string} className=' text-right'><BookCard book={item} authors={authors} /></TabsContent>
      ))}
      </div>
      </Tabs>
    </div>
  )
}

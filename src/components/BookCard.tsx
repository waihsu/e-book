import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Image from 'next/image'
import { Author, Books } from '@prisma/client'

export default function BookCard({book,authors}: {book: Books,authors: Author[]}) {
    const authorName = (id: number) => {
        return authors.filter(author => author.id === id)[0]?.name
      }
  return (
    <Card className='flex sm:w-[500px] h-[300px] bg-[#3B3B47]'>
        <div className='w-1/2 flex justify-center p-2 hover:scale-110 transition ease-in-out delay-200 duration-300'>
          <Image src={book.asset_url} alt='bookImage' layout='responsive' width={0} height={0} />
        </div>
        <div>
        <CardHeader>
          <CardTitle className='text-3xl'>{book.title}</CardTitle>
          <CardDescription>Author: {authorName(book.author_id)}</CardDescription>
        </CardHeader>
        <CardContent>
          Price: {book.price === "0" ? "Free" : book.price}
        </CardContent>
        <CardFooter>
          <Button>Download</Button>
        </CardFooter>
        </div>
      </Card>
  )
}

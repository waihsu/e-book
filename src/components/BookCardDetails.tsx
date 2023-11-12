'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Image from 'next/image'
import { Author, Books, User } from '@prisma/client'
import {BsFillCalendar2XFill} from 'react-icons/bs'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


export default function BookCardDetails({book,authors}: {book: Books,authors: Author[]}) {
  const {data: session} = useSession()
  const user = session?.user as User
    const authorName = (id: number) => {
        return authors.filter(author => author.id === id)[0]?.name
      }
  return (
    <Card className='flex flex-wrap w-full sm:w-[500px] md:w-[800px] mx-auto'>
        <div className='w-1/2 flex justify-center p-2'>
          <Image src={book.asset_url} alt='bookImage' width={500} height={0} />
        </div>
        <div className=' w-1/2 text-left'>
        <CardHeader>
          <CardTitle className='text-sm sm:text-lg md:text-5xl mb-4'>{book.title}</CardTitle>
          <CardDescription className='text-xs sm:text-sm md:text-lg'>Author: {authorName(book.author_id)}</CardDescription>
        </CardHeader>
        <CardContent className='text-xs sm:text-sm md:text-2xl'>
          Price: {book.price === "0" ? "Free" : book.price}
        </CardContent>
        <CardContent className='items-center gap-2 hidden sm:flex'>
            <BsFillCalendar2XFill />:<span className='text-sm'>{book.createdAt.toUTCString()}</span>
        </CardContent>
        {user?.is_paid ? (
          <CardFooter>
          <Link href={book.book_url}><Button>Download</Button></Link>
        </CardFooter>
        ) : (
          <CardFooter>
          {book.is_premium ? <Button>Premium</Button> : <Link href={book.book_url}><Button>Download</Button></Link>}
        </CardFooter>
        )}
        </div>
      </Card>
  )
}

'use client'
import BookCard from '@/components/BookCard'
import { Author, Books } from '@prisma/client'
import React from 'react'
import { SwiperSlide,Swiper } from 'swiper/react'


export default function BookSlider({books,authors}: {books: Books[],authors: Author[]}) {
  return (
    
    <Swiper spaceBetween={50} direction='horizontal'>
      {books.map(item => (
        <SwiperSlide key={item.id}>
            <BookCard book={item} authors={authors}  />
        </SwiperSlide>
      ))}
    </Swiper>
    
  )
}

'use client'
import BookCard from '@/components/BookCard'
import { Author, Books } from '@prisma/client'
import React from 'react'
import { SwiperSlide,Swiper } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { EffectFade } from 'swiper/modules';


import 'swiper/css/effect-fade';


export default function BookSlider({books,authors}: {books: Books[],authors: Author[]}) {
  return (
    
    <Swiper modules={[EffectFade]}  autoplay={{delay: 3000}}  spaceBetween={20} direction='horizontal' slidesPerView={1} breakpoints={{640: {width: 440,slidesPerView: 1},768: {width: 968, slidesPerView: 2}}}  >
      {books.map(item => (
        <SwiperSlide key={item.id}>
            <BookCard book={item} authors={authors}  />
        </SwiperSlide>
        
      ))}
    </Swiper>
    
  )
}

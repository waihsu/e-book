'use client'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategoryAlt} from 'react-icons/bi'
import {PiBooksFill} from 'react-icons/pi'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

export default function BackOfficeSideBar() {

    const params = useSearchParams()
    console.log(params.getAll("/backoffice"))

    const menuItems = [
        {
            id: 1,
            name: "Autor",
            route: "/backoffice/author",
            icon: <AiOutlineHome />
        },
        {
            id: 2,
            name: "Categories",
            route: "/backoffice/categories",
            icon: <BiCategoryAlt />
        },
        {
            id: 3,
            name: "Books",
            route: "/backoffice/books",
            icon: <PiBooksFill />
        },
        {
            id: 4,
            name: "Chapters",
            route: "/backoffice/chapters",
            icon: <PiBooksFill />
        }
    ]

  return (
    <div className='dark:bg-[#36363F]  w-60 h-96'>
        <h4>
                    BackOffice
                </h4>
        {menuItems.map(item => (
           
                
                    <Link href={item.route} key={item.id} className='bg-red-500 w-full'>
                <p className='flex items-center gap-2 bg-orange-300'>
                    {item.icon}
                    {item.name}
                </p></Link>
                
         
        ))}
    </div>
  )
}

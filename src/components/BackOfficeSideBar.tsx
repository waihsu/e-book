import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategoryAlt} from 'react-icons/bi'
import {PiBooksFill} from 'react-icons/pi'
import Link from 'next/link'

export default function BackOfficeSideBar() {

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
        }
    ]

  return (
    <Card className=' w-60 h-96'>
        <CardHeader>
                    BackOffice
                </CardHeader>
        {menuItems.map(item => (
            <div key={item.id}>
                <Link href={item.route}>
                <CardContent className='flex items-center gap-2'>
                    {item.icon}
                    {item.name}
                </CardContent></Link>
            </div>
        ))}
    </Card>
  )
}

'use client'
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai'
import { motion } from "framer-motion"
import { MenuItem } from './MenuItems'
import Link from 'next/link'
import { Card } from './ui/card'


const variants = {
    open: { opacity: 1,  y: 10, },
    closed: { opacity: 0, y: -1000, },
  }

  const menuItems = [
    {
      id: 1,
      name: "HOME",
      route: "/",
    },
    {
      id: 2,
      name: "FREE",
      route: "/books/free-books",
    },
    {
      id: 3,
      name: "PREMIUM",
      route: "/books/premium-books",
    },
    {
      id: 4,
      name: "AUTHORS",
      route: "/authors",
    },
    {
      id: 5,
      name: "ABOUT",
      route: "/about",
    },
  ];

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div >
        <div className=' text-4xl' onClick={() => setIsOpen(!isOpen)}>
        <p>{isOpen ? <AiOutlineClose /> : <AiOutlineMenuFold /> }</p>
        </div>
       
        <motion.div variants={variants} animate={isOpen ? "open" : "closed"} transition={{ delay: .1,duration: .6}}  className='w-full rounded-lg border border-gray-100 h-screen flex flex-col absolute z-50 right-0 top-20'>
        <Card className='h-full'>
        {menuItems.map(item => (
            <Link onClick={() => setIsOpen(false)} key={item.id} href={item.route}>
                <MenuItem name={item.name}  />
            </Link>
        ))}
        </Card>
        </motion.div>
     
    </div>
  )
}

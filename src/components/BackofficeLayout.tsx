import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

interface Props {
    children: React.ReactNode;
    title: string;
    link: string;
    button?: string;
    open?: boolean;
    setOpen?: (value: boolean) => void;
  }
  

export default function BackofficeLayout({children,title,link,button}: Props) {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-bold'>{title}</h3>
            <Link href={link}>
            {button ? <Button>{button}</Button> : ""}
            </Link>
        </div>
        <div className='py-4 min-h-[400px]'>
        {children}
        </div>
    </div>
  )
}

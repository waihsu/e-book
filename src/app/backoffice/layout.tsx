
import BackOfficeSideBar from '@/components/BackOfficeSideBar'
import { Card } from '@/components/ui/card'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackofficeLayout({children}: {children: React.ReactNode}) {


  return (
    <section className='flex min-h-screen items-center justify-center gap-10'>
        <BackOfficeSideBar />
        <div className=' w-[800px]' >
        {children}
        </div>
    </section>
  )
}

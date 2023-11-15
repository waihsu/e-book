
import BackOfficeSideBar from '@/components/BackOfficeSideBar'
import { Card } from '@/components/ui/card'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function BackofficeLayout({children}: {children: React.ReactNode}) {

  const session = await getServerSession(authOptions)
  const user = session?.user as User
  const role = user?.role
  console.log(session)
  if (role !== "ADMIN") {
    redirect("/")
  }

  return (
    <section className='flex min-h-screen items-center justify-center gap-10'>
        <BackOfficeSideBar />
        <div className=' w-[800px]' >
        {children}
        </div>
    </section>
  )
}

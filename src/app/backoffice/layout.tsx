import BackOfficeSideBar from '@/components/BackOfficeSideBar'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function BackofficeLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='flex min-h-screen items-center justify-center gap-10'>
        <BackOfficeSideBar />
        <Card className=' w-[800px]' >
        {children}
        </Card>
    </section>
  )
}

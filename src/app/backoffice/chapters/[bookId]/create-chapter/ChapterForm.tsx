"use client"

import React, { useState } from 'react'

import * as z from "zod"


import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createChapter } from '@/app/action'
import { useRouter } from 'next/navigation'





export default function ChapterForm({bookId}: {bookId: string}) {
  const router = useRouter()
console.log(bookId)
    const [chapter, setChapter] = useState({
      book_id: bookId,
      title: "",
      // body: ""
    })

    async function onSubmit() {
        
       await  createChapter(chapter)
        router.push(`/backoffice/chapters/${bookId}`)
        router.refresh()
      }
    
    
  return (
    <div>
      <form action={onSubmit}>
        <div>
          <Label>Title</Label>
          <Input  placeholder="Title"
          type="text"
          onChange={(e) => setChapter({ ...chapter, title: e.target.value })} />
        </div>
        {/* <div>
          <Label>Body</Label>
          <Textarea  placeholder="Text Body"
          
          onChange={(e) => setChapter({ ...chapter, body: e.target.value })} />
        </div> */}
        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

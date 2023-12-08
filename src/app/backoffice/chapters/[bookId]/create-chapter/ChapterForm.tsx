"use client"

import React, { useState } from 'react'

import * as z from "zod"


import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createChapter } from '@/app/action'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'





export default function ChapterForm({bookId}: {bookId: string}) {
  const router = useRouter()
console.log(bookId)
    const [chapter, setChapter] = useState({
      book_id: bookId,
      title: "",
      // body: ""
    })

    async function onSubmit() {
        
       const data = await  createChapter(chapter)
         if (data === "successful") {
          toast({title: data})
          router.refresh();
         }else {
          toast({title: data})
         }
      }
    
    
  return (
    <div>
      <form action={onSubmit}>
        <div className=" mb-2">
          <Label>Title</Label>
          <Input
            placeholder="Title"
            type="text"
            onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
          />
        </div>
        {/* <div>
          <Label>Body</Label>
          <Textarea  placeholder="Text Body"
          
          onChange={(e) => setChapter({ ...chapter, body: e.target.value })} />
        </div> */}
        <DialogClose>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </div>
  );
}

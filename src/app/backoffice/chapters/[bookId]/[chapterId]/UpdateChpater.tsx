'use client'
import { updateChapter } from '@/app/action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Chapters } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function UpdateChpater({chapter}: {chapter: Chapters}) {
    const router = useRouter()
    const [chapterInfo, setChapterInfo] = useState(chapter)

    const onUpdate = async () => {
        const data = await updateChapter(chapterInfo)
        if (data === "successful") {
            toast({title: data})
            router.refresh()
        }else {
            toast({title: data})
            router.refresh()
        }
    }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit Chapter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter Title</DialogTitle>
        </DialogHeader>
        <Input
          defaultValue={chapter?.title}
          onChange={(e) =>
            setChapterInfo({ ...chapterInfo, title: e.target.value })
          }
        />
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdate}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

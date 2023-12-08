'use client'
import { deleteChapter } from '@/app/action';
import DeleteDialog from '@/components/DeleteDialog';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DeleteChapter({bookId,chapterId}: {bookId: string,chapterId: string}) {

    const router = useRouter()

    const onDelete = async () => {
        const data = await deleteChapter(chapterId)
        if (data === "successful") {
            toast({title: data})
            router.back()
            router.refresh()
        }else {
            toast({title: data})
        }
    }

  return (
    <div>
      <DeleteDialog route={`/backoffice/chapters/${bookId}`} callback={onDelete} />
    </div>
  );
}

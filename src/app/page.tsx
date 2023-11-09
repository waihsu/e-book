
import FileDropZone from '@/components/FileDropZone'
import { storage } from '@/db'
import { prisma } from '@/libs/prisma'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import { useState } from 'react'


export default async function Home() {
  // const [selectedFile, setSelectedFile] = useState<File[]>([])
  // const onSelectedFile = (selectedFile: File[]) => {
  //   setSelectedFile(selectedFile)
  // }

  // const uploadFile = async (selectedFile: File[]) => {
  //   try {
  //     const postsRef = ref(storage, `books/${selectedFile[0].name}`);
  //     const bookRef = ref(storage, `books/${selectedFile[0].name}`);
  //     const bookUrl = await uploadBytes(postsRef, selectedFile[0]);

  //     const data = await getDownloadURL(bookRef);
  //     return data;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // }

  const books = await prisma.books.findMany()


  return (
    <>
    <div className=' h-96 bg-purple-500 flex items-center justify-center'>
      <h3 className=' text-2xl font-bold'>Myanmar E-Book Free & Premium Download </h3>
    </div>
    <div>
      {books.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
    </>
  )
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/db";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { createBook, deleteBook, updateBook } from "@/app/action";
import { Author, Books, Categories } from "@prisma/client";
import { TextField } from "@mui/material";
import { Card } from "@/components/ui/card";

interface newBook {
  title: string;
  asset_url: string;
  book_url: string;
  price: string;
  is_premium: boolean;
  author_id: number;
  categories_id: number;
}

export function EditBookForm({
    book,
  author,
  categories,
  connectedCategoryIds
}: {
    book: Books
  author: Author;
  categories: Categories[];
  connectedCategoryIds: string[]
}) {
  const router = useRouter();

  const [bookInfo, setBookInfo] = useState({
    id: book.id,
    title: book.title,
    price: book.price as string,
    is_premium: book.is_premium,
    categories_id: connectedCategoryIds,
  });
  const [open, setOpen] = useState(false);
  const [bookImg, setBookImg] = useState<File[]>([]);
  const [bookFile, setBookFile] = useState<File[]>([]);
  const [is_premium, setIsPremium] = useState(false);

  const uploadBookImage = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first book image");
    const postsRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };

  const uploadBookFile = async (selectedFile: File[]) => {
    if (!selectedFile.length) return alert("Please select first book PDF File");
    const postsRef = ref(storage, `books/${selectedFile[0].name}`);
    const bookRef = ref(storage, `books/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);
    const data = await getDownloadURL(bookRef);
    return data;
  };

  async function onSubmit() {
    updateBook(bookInfo)
       router.replace("/backoffice/books")
      router.refresh();
    
  }

  console.log(connectedCategoryIds)

  return (
    <div>
        <div className="flex justify-end">
        <Button onClick={() => {
           deleteBook(book.id)
            router.replace("/backoffice/books")
            router.refresh()
        }} style={{backgroundColor: 'red'}}>Delete</Button>
        </div>
    <Card className="p-4">
      <form action={onSubmit} className="space-y-4">
      <div>
        <Label>Select Categories</Label>
        <Autocomplete
          multiple
          id="tags-standard"
          options={categories}
          defaultValue={categories.filter(item => connectedCategoryIds.includes(item.id))}
          getOptionLabel={(option) => option.name}
          onChange={(option, value) =>
            setBookInfo({ ...bookInfo, categories_id: value.map((item) => item.id) })
          }
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              key={params.inputProps.id}
              {...params}
              id="categories"
              variant="standard"
              // label="Multiple values"
              placeholder="Categories"
            />
          )}
        />
      </div>

      <div>
        <Label>Author</Label>
        <p>{author.name}</p>
      </div>

      <div>
        <Label>Title</Label>
        <Input
          placeholder="Title"
          defaultValue={book.title}
          type="text"
          onChange={(e) => setBookInfo({ ...bookInfo, title: e.target.value })}
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
        defaultValue={book.price as string}
          placeholder="Price"
          type="text"
          onChange={(e) => setBookInfo({ ...bookInfo, price: e.target.value })}
        />
      </div>
      <div>
        <Label>Is Premium</Label>
        <Switch
        defaultChecked={book.is_premium}
        //   checked={book.is_premium}
          onCheckedChange={() => setBookInfo({...bookInfo,is_premium: !book.is_premium})}
        />
      </div>
     
      <Button type="submit">Update</Button>
    </form>
    </Card>
    </div>
  );
}

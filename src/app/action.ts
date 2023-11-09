"use server";

import { storage } from "@/db";
import { prisma } from "@/libs/prisma";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function create(name: string) {
  // console.log(typeof formData.get("name"))
  // const categoryName = formData.get("name")
  const createCategory = await prisma.categories.create({
    data: { name: name },
  });
  console.log(createCategory);
}

export async function createAuthor({
  name,
  date_of_birth,
  bio_graphy,
}: {
  name: string;
  date_of_birth: string;
  bio_graphy: string;
}) {
  const createdAuthor = await prisma.author.create({
    data: {
      name,
      date_of_birth,
      bio_graphy,
    },
  });
  console.log(createdAuthor);
}

export async function createBook({
  title,
  asset_url,
  book_url,
  price,
  is_premium,
  author_id,
  categories_id,
}: {
  title: string;
  asset_url: string;
  book_url: string;
  price: string;
  is_premium: boolean;
  author_id: number;
  categories_id: number;
}) {
  const createdBook = await prisma.books.create({
    data: {
      title,
      asset_url,
      book_url,
      price,
      is_premium,
      author_id,
      categories_id
    }
  })
  console.log(createdBook)
}


export  const uploadBookImage = async (selectedFile: File[]) => {
  
    const postsRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);

    const data = await getDownloadURL(bookRef);
    console.log(data)
    return data;

}
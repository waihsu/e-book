"use server";

import { storage } from "@/db";
import { prisma } from "@/libs/prisma";
import { Author } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";




export async function createCategory(name: string) {
  // console.log(typeof formData.get("name"))
  // const categoryName = formData.get("name")
  const createCategory = await prisma.categories.create({
    data: { name: name },
  });
  console.log(createCategory);
}

export async function updateCategory({id,name}: {id: string,name: string}) {
  const updatedCategory = await prisma.categories.update({where: {id},data: {name} })
}

export async function deleteCategory(id: string) {
  await prisma.categories_Books.updateMany({where: {categories_id: id}, data: {is_archived: true}})
  const deletedCategory = await prisma.categories.update({where: {id},data: {is_archived: true}})
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

export async function updateAuthor({id,name,date_of_birth,bio_graphy}: {id: string;
  name: string;
  date_of_birth: string;
  bio_graphy: string;}) {
  const updatedAuthor = await prisma.author.update({where: {id: id},data: {name,date_of_birth,bio_graphy}})
}

export async function deleteAuthor(id: string) {
  const deletedAuthor = await prisma.author.update({where: {id}, data: {is_archived: true}})
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
  author_id: string;
  categories_id: string[];
}) {
  const createdBook = await prisma.books.create({data: {title,asset_url,book_url,price,is_premium,author_id: author_id}})
  const createCategoriesBooks = await prisma.$transaction(
    categories_id.map(item => prisma.categories_Books.create({data: {books_id: createdBook.id, categories_id: item}}))
  )
  console.log(createdBook)
}

export async function updateBook({
  id,
  title,
  price,
  is_premium,
  categories_id,
}: {
  id: string;
  title: string;
  price: string;
  is_premium: boolean;
  categories_id: string[];
}) {
  const existCategories = await prisma.categories_Books.findMany({where: {books_id: id,is_archived: false}})
  const existCategoriesIds = existCategories.map(item => item.categories_id)
  const removeCategoriesIds = existCategoriesIds.filter(item => !categories_id.includes(item))
  const addedCategoreisIds = categories_id.filter(item => !existCategoriesIds.includes(item))
  console.log("existCategoriesIds",existCategoriesIds)
  console.log("removeCategoriesIds",removeCategoriesIds)
  console.log("addedCategoreisIds",addedCategoreisIds)
  if (addedCategoreisIds.length) {
    await prisma.$transaction(
      addedCategoreisIds.map(item => prisma.categories_Books.create({data: {books_id: id,categories_id: item}}))
    )
  }
  if (removeCategoriesIds.length) {
    await prisma.$transaction(
      removeCategoriesIds.map(item => prisma.categories_Books.deleteMany({where: {categories_id: item, books_id: id}}))
    )
  }
const updatedBook = await prisma.books.update({where: {id},data: {title,price,is_premium}})
}

export async function deleteBook(id: string) {
  await prisma.categories_Books.deleteMany({where: {books_id: id}})
  const deletedBook = await prisma.books.delete({where: {id}})
}



export async function createChapter({book_id,title}: {book_id: string, title: string, }) {
  const createdChapter = await prisma.chapters.create({
    data: {
      book_id: book_id,
      title: title,
    }
  })
  console.log(createdChapter)
}


export async function createPage({chapter_id,page_number,body}: {chapter_id: string, page_number: string, body: string}) {
  await prisma.pages.create({data: {chapter_id,page_number,body}})
}



export  const uploadBookImage = async (selectedFile: File[]) => {
  
    const postsRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookRef = ref(storage, `images/${selectedFile[0].name}`);
    const bookUrl = await uploadBytes(postsRef, selectedFile[0]);

    const data = await getDownloadURL(bookRef);
    console.log(data)
    return data;

}
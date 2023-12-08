"use server";

import { storage } from "@/db";
import { prisma } from "@/libs/prisma";
import { Author } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function createCategory(name: string) {
  try {
    const createCategory = await prisma.categories.create({
      data: { name: name },
    });
    return "successful";
  } catch (err) {
    return err;
  }
}

export async function updateCategory({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  try {
    const updatedCategory = await prisma.categories.update({
      where: { id },
      data: { name },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.categories_Books.updateMany({
      where: { categories_id: id },
      data: { is_archived: true },
    });
    const deletedCategory = await prisma.categories.update({
      where: { id },
      data: { is_archived: true },
    });
    return "successful";
  } catch (err) {
    return err;
  }
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
  try {
    const createdAuthor = await prisma.author.create({
      data: {
        name,
        date_of_birth,
        bio_graphy,
      },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function updateAuthor({
  id,
  name,
  date_of_birth,
  bio_graphy,
}: {
  id: string;
  name: string;
  date_of_birth: string;
  bio_graphy: string;
}) {
  try {
    const updatedAuthor = await prisma.author.update({
      where: { id: id },
      data: { name, date_of_birth, bio_graphy },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function deleteAuthor(id: string) {
  try {
    const deletedAuthor = await prisma.author.update({
      where: { id },
      data: { is_archived: true },
    });
    return "successful";
  } catch {
    return "error";
  }
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
  try {
    const createdBook = await prisma.books.create({
      data: {
        title,
        asset_url,
        book_url,
        price,
        is_premium,
        author_id: author_id,
      },
    });
    const createCategoriesBooks = await prisma.$transaction(
      categories_id.map((item) =>
        prisma.categories_Books.create({
          data: { books_id: createdBook.id, categories_id: item },
        })
      )
    );
    return "successful";
  } catch {
    return "error";
  }
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
  try {
    const existCategories = await prisma.categories_Books.findMany({
      where: { books_id: id, is_archived: false },
    });
    const existCategoriesIds = existCategories.map(
      (item) => item.categories_id
    );
    const removeCategoriesIds = existCategoriesIds.filter(
      (item) => !categories_id.includes(item)
    );
    const addedCategoreisIds = categories_id.filter(
      (item) => !existCategoriesIds.includes(item)
    );
    console.log("existCategoriesIds", existCategoriesIds);
    console.log("removeCategoriesIds", removeCategoriesIds);
    console.log("addedCategoreisIds", addedCategoreisIds);
    if (addedCategoreisIds.length) {
      await prisma.$transaction(
        addedCategoreisIds.map((item) =>
          prisma.categories_Books.create({
            data: { books_id: id, categories_id: item },
          })
        )
      );
    }
    if (removeCategoriesIds.length) {
      await prisma.$transaction(
        removeCategoriesIds.map((item) =>
          prisma.categories_Books.deleteMany({
            where: { categories_id: item, books_id: id },
          })
        )
      );
    }
    const updatedBook = await prisma.books.update({
      where: { id },
      data: { title, price, is_premium },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function deleteBook(id: string) {
  try {
    await prisma.categories_Books.updateMany({
      where: { books_id: id },
      data: { is_archived: true },
    });
    const deletedBook = await prisma.books.update({
      where: { id },
      data: { is_archived: true },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function createChapter({
  book_id,
  title,
}: {
  book_id: string;
  title: string;
}) {
  try {
    const createdChapter = await prisma.chapters.create({
      data: {
        book_id: book_id,
        title: title,
      },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function deleteChapter(id: string) {
 try {
   await prisma.pages.deleteMany({where: {chapter_id: id}})
  await prisma.chapters.delete({where: {id}})
  return "successful"
 }catch {
  return "error"
 }
}

export async function createPage({
  chapter_id,
  page_number,
  asset_url,
}: {
  chapter_id: string;
  page_number: string;
  asset_url: string;
}) {
  try {
    await prisma.pages.create({ data: { chapter_id, page_number, asset_url } });
    return "successful";
  } catch {
    return "error";
  }
}

export async function updatePage({
  id,
  page_number,
  asset_url,
  chapter_id,
}: {
  id: string;
  page_number: string;
  asset_url: string;
  chapter_id: string;
}) {
  try {
    const updatedPage = await prisma.pages.update({
      where: { id: id },
      data: { page_number, asset_url, chapter_id },
    });
    return "successful";
  } catch {
    return "error";
  }
}

export async function deletePage(id: string) {
  try {
    const deletedPage = await prisma.pages.delete({ where: { id } });
    return "successful";
  } catch {
    return "error";
  }
}

export const uploadBookImage = async (selectedFile: File[]) => {
  const postsRef = ref(storage, `images/${selectedFile[0].name}`);
  const bookRef = ref(storage, `images/${selectedFile[0].name}`);
  const bookUrl = await uploadBytes(postsRef, selectedFile[0]);

  const data = await getDownloadURL(bookRef);
  console.log(data);
  return data;
};

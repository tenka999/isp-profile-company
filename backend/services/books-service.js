import prisma from "../config/database.js";
import fs from "fs";
import path, { parse } from "path";

export async function getAllBooks(queryPrisma) {
  return await prisma.books.findMany(queryPrisma);
}

export async function getAllBooksByDeleted() {
  return await prisma.books.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },
    include: {
      deletedByUser: true,
    },
  });
}

export async function getAllBooksByUpdated() {
  return await prisma.books.findMany({
    where: {
      updatedAt: {
        not: null,
      },
    },
    include: {
      updatedByUser: true,
    },
  });
}

export async function getAllBooksExist() {
  return await prisma.books.findMany({
    where: {
      deletedAt: null,
    },
  });
}

export async function getBookById(id) {
  return await prisma.books.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
      genre: true,
    },
  });
}

export async function createBook(data) {
  console.log(data)
  return await prisma.books.create({
    data: {
      title: data.title,
      author: data.author,
      year: parseInt(data.year),
      ISBN: data.ISBN,
      cover: data.cover,
      stock: data.stock ? parseInt(data.stock) : 0,
      categoryId: parseInt(data.categoryId),
      genreId: parseInt(data.genreId),
      cover: data.cover,
      createdById: parseInt(data.createdById),
      pdf_url: data.pdf_url,
      detailbook: { create: {}  }
    },
    include: {
      category: true,
      genre: true,
    },
  });
}

export async function deleteBookById(id, deletedById) {
   const oldBook = await prisma.books.findUnique({
     where: { id: id },
   });

   // hapus file cover jika ada
   if (oldBook?.cover) {
     const oldPath = path.join(
       process.cwd(),
       oldBook.cover.replace("/coverbook", "uploads/cover-book")
     );
     if (fs.existsSync(oldPath)) {
       fs.unlinkSync(oldPath);
     }
   }

   if (oldBook?.pdf_url) {
     const oldPath = path.join(
       process.cwd(),
       oldBook.pdf_url.replace("/pdfbook", "uploads/pdf-book")
     );
     if (fs.existsSync(oldPath)) {
       fs.unlinkSync(oldPath);
     }
   }
  return await prisma.books.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
      deletedById: deletedById,
    },
  });
}

export async function updateBookById(id, data, updatedById) {
  console.log("Updating book:", id, data, updatedById);
  // cari data buku lama
  const oldBook = await prisma.books.findUnique({
    where: { id: id },
  });

  // kalau ada cover baru, hapus file lama
  if (data.cover && oldBook?.cover) {
    const oldPath = path.join(
      process.cwd(),
      oldBook.cover.replace("/coverbook", "uploads/cover-book")
    );
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }
  if (oldBook?.pdf_url) {
     const oldPath = path.join(
       process.cwd(),
       oldBook.pdf_url.replace("/pdfbook", "uploads/pdf-book")
     );
     if (fs.existsSync(oldPath)) {
       fs.unlinkSync(oldPath);
     }
  }
  return await prisma.books.update({
    where: {
      id: id,
    },
    data: {
      // ...data
      title: data.title,
      author: data.author,
      year: parseInt(data.year),
      ISBN: data.ISBN,
      cover: data.cover,
      stock: data.stock ? parseInt(data.stock) : 0,
      // categoryId: parseInt(data.categoryId),
      category: {
        connect: { id: parseInt(data.categoryId) },
      },
      genre: {
        connect: { id: parseInt(data.genreId) },
      },
      pdf_url: data.pdf_url,
      updatedByUser: {
        connect: { id: parseInt(updatedById) },
      },
      // updatedById: parseInt(updatedById),
      updateAt: new Date(),
    },
    include: {
      category: true,
      genre: true,
    },
  });
}

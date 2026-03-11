import prisma from "../config/database.js";

async function getallAnnotation() {
  return await prisma.annotation.findMany();
}

async function getAnnotationById(id) {
  return await prisma.annotation.findUnique({
    where: {
      id: id,
    },
  });
}

async function getAnnotationByBookId(id) {
  return await prisma.annotation.findMany({
    where: {
      bookId: id,
    },
  });
}

async function createAnnotation(data) {
  return await prisma.annotation.create({
    data: {
        bookId: data.bookId,
        userId: data.userId,
        page: data.page,
        content : data.content,
    },
  });
}

async function updateAnnotation(id,data) {
  return await prisma.annotation.update({
    where: {
      id: id,
    },
    data: {
        page: data.page,
        content : data.content,
    },
  });
}

async function deleteAnnotationById(id) {
  return await prisma.annotation.delete({
    where: {
      id: id,
    },
  })
}

export default {
  getallAnnotation,
  getAnnotationById,
  getAnnotationByBookId,
  createAnnotation,
  updateAnnotation,
  deleteAnnotationById,
};
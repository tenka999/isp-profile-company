import prisma from "../config/database.js";
async function getAllReview() {
  return await prisma.review.findMany();
}

async function getAllReviewByBookId(id) {
  return await prisma.review.findMany({
    where: {
      bookId: id,
      deletedAt: null
    },
  });
}

async function getReviewByUserId(id) {
  return await prisma.review.findMany({
    where: {
      userId: id,
      deletedAt: null,
    },
  });
}

async function getAllReviewByParentId(id) {
  return await prisma.review.findMany({
    where: {
      parentId: id,
      deletedAt: null,
    },
  });
}

async function getReviewByExist() {
  return await prisma.review.findMany({
    where: {
      deletedAt: null,
    },
  });
}

async function getAllReviewDeleted() {
  return await prisma.review.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },
  });
}

async function getReviewById(id) {
  return await prisma.review.findUnique({
    where: {
      id: id,
    },
  });
}

async function upsertReview(id,data) {
  return await prisma.review.upsert({
    where: {
      id: id,
      
    },
    update: {
      rating: data.rating,
      comment: data.comment,
      bookId: data.bookId,
      userId: data.userId,
      parentId: data.parentId,
      updatedById: data.updatedById
    },
    create: {
      rating: data.rating,
      comment: data.comment,
      bookId: data.bookId,
      userId: data.userId,
      parentId: data.parentId,
      createdById: data.createdById,
    },
  })   
}

async function deleteUser(id, deletedById) {
  return await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
      deletedById: deletedById,
    },
  });
}

export default {
  getAllReview,
  getAllReviewByBookId,
  getReviewByUserId,
  getAllReviewByParentId,
  getReviewByExist,
  getAllReviewDeleted,
  getReviewById,
  upsertReview,
  deleteUser,
};
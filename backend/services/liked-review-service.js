import prisma from "../config/database.js";

async function getAllLikeReview() {
  return await prisma.likedReview.findMany();
}

async function getLikedReviewById(id) {
  return await prisma.likedReview.findUnique({
    where: {
      id: id,
    },
  });
}

async function getTotalLikedReviewByUser(id) {
  return await prisma.likedReview.count({
    where: {
      userId: id,
    },
  });
}

async function getTotalLikedReviewByBook(id) {
  return await prisma.likedReview.count({
    where: {
      reviewId: id,
    },
  });
}

async function toggleLikeReview(data) {
  const { userId, reviewId } = data;
  const existingLike = await prisma.likedReview.findUnique({
    where: {
      userId_reviewId: {
        userId: userId,
        reviewId: reviewId,
      },
    },
  });

  if (existingLike) {
    return await prisma.likedReview.delete({
      where: {
        userId_reviewId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });
  } else {
    return await prisma.likedReview.create({
      data: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }
}

export default {
  getAllLikeReview,
  getLikedReviewById,
  getTotalLikedReviewByUser,
  getTotalLikedReviewByBook,
  toggleLikeReview,
};
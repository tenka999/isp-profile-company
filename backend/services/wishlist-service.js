import prisma from "../config/database.js";

async function getAllWishlist() {
  return await prisma.wishlist.findMany();
}

async function getWishlistById(id) {
  return await prisma.wishlist.findUnique({
    where: {
      id: id,
    },
  });
}

async function getWishlistByUserId(id) {
    return await prisma.wishlist.findMany({
      where: {
        userId: id,
        deletedAt: null,
      },
    })    
}
async function getWishlistByBookId(id) {
    return await prisma.wishlist.findMany({
      where: {
        bookId: id,
        deletedAt: null,
      },
    })    
}

async function createWhishlist(data) {
  return await prisma.wishlist.create({
    data: {
      userId: data.userId,
      bookId: data.bookId,
      createdById: data.createdById
    }    
  });
}

async function updateWishlist(id,data) {
  return await prisma.wishlist.update({
    where: {
      id: id,
    },
    data: {
      userId: data.userId,
      bookId: data.bookId,
      updatedById: data.updatedById
    },
  });
}

async function deleteWishlistById(id, deletedById) {
  return await prisma.wishlist.update({
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
  getAllWishlist,
  getWishlistById,
  getWishlistByUserId,
  getWishlistByBookId,
  createWhishlist,
  updateWishlist,
  deleteWishlistById,
};
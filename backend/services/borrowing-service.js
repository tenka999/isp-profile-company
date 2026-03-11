import prisma from "../config/database.js";

async function getAllBorrowing() {
    return await prisma.borrow.findMany();
}

async function getBorrowingDeleted() {
    return await prisma.borrow.findMany({
        where: {
            deletedAt: {
                not: null
            }
        },
        include: {
            deletedByUser: true
        }
    });
    
}

async function getBorrowingById(id) {
    return await prisma.borrow.findUnique({
        where: {
            id: id
        }
    });
}

async function getAllBorrowingExist() {
  return await prisma.borrow.findMany({
    where: {
      deletedAt: null,
    },
  });
}

async function getAllBorrowingByIdUser(userId) {
  return await prisma.borrow.findMany({
    where: {
      deletedAt: null,
      userId: userId      
    },
  });
}

async function getAllBorrowingByStatus(status) {
  return await prisma.borrow.findMany({
    where: {
      deletedAt: null,
      status: status
    },
  });
}

async function createBorrowing(data) {
    return await prisma.borrow.create({
        data: {
            userId: data.userId,
            bookId: data.bookId,
            endDate: data.endDate,
            createdById: data.createdById
        }
    });
}

async function deleteBorrowingById(id, deletedById) {
  return await prisma.borrow.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
      deletedById: deletedById,
    },
  });
}

async function updateBorrowingById(id, data, updatedById) {
  return await prisma.borrow.update({
    where: {
      id: id,
    },
    data: {
      updatedById: updatedById,
      userId: data.userId,
      bookId: data.bookId,
      endDate: data.endDate,
      staffId: data.staffId,
      status: data.status
    },
  });
}


export default {
    getAllBorrowing,
    getBorrowingDeleted,
    getBorrowingById,
    getAllBorrowingExist,
    getAllBorrowingByIdUser,
    getAllBorrowingByStatus,
    createBorrowing,
    deleteBorrowingById,
    updateBorrowingById
}
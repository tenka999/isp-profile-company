import prisma from "../config/database.js";

async function getAllDetailBook() {
    return await prisma.detailbook.findMany();
}

async function getDetailBookById(id) {
    console.log(id)
    return await prisma.detailbook.findUnique({
        where: {
            bookId: parseInt(id)
        },
        
    });
}

async function  getDetailBookByDeleted() {
    return await prisma.detailbook.findMany({
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

async function getDetailBookByExist() {
    return await prisma.detailbook.findMany({
        where: {
            deletedAt: null
        }
    })
}


async function deleteDetailBookById(id, deletedById) {
  return await prisma.detailbook.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
      deletedById: deletedById,
    },
  });
}


async function updateDetailBook(id, data) {
    return await prisma.detailbook.update({
        where: {
            id: id
        },
        data: {
            originaltitle: data.originaltitle,
            rating: data.rating,
            review_count: data.review_count,
            description: data.description,
            pages: data.pages,
            language: data.language,
            bookId: data.bookId,
            updatedById: data.updatedById

        }
    });
}

async function createDetailBook(data) {

    const isExist = await prisma.detailbook.count({
        where: {
            bookId: data.bookId
        }
    })

    if(isExist) {
        throw new Error("Detail Book already exist");
    }
    return await prisma.detailbook.create({
        data: {
            originaltitle: data.originaltitle,
            rating: data.rating,
            review_count: data.review_count,
            description: data.description,
            pages: data.pages,
            language: data.language,
            bookId: data.bookId,
            createdById: data.createdById
        }
    });
}

export default {
    getAllDetailBook,
    getDetailBookById,
    getDetailBookByDeleted,
    getDetailBookByExist,
    deleteDetailBookById,
    updateDetailBook,
    createDetailBook
}
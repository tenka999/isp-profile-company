import prisma from "../config/database.js";

async function getAllLikedBook() {
    return await prisma.likedBook.findMany();
}

async function getLikedBookById(id) {
    return await prisma.likedBook.findUnique({
        where: {
            id: id,
        },
    });
}

async function getTotalLikedByUser(id) {
    return await prisma.likedBook.count({
        where: {
            userId: id,
        },
    });
}

async function getTotalLikedByBook(id) {
    return await prisma.likedBook.count({
        where: {
            bookId: id,
        },
    });
}

async function toggleLike(data) {
    const { userId, bookId } = data;
    const existingLike = await prisma.likedBook.findUnique({
        where: {
            userId_bookId: {
                userId: userId,
                bookId: bookId,
            },
        },
    });

    if (existingLike) {
        return await prisma.likedBook.delete({
            where: {
                userId_bookId: {
                    userId: userId,
                    bookId: bookId,
                },
            },
        });
    } else {
        return await prisma.likedBook.create({
            data: {
                userId: userId,
                bookId: bookId,
            },
        });
    }
}

export default {
    getAllLikedBook,
    getLikedBookById,
    getTotalLikedByUser,
    getTotalLikedByBook,
    toggleLike,
};
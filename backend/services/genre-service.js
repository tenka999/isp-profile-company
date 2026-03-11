import prisma from "../config/database.js";

async function getallGenre() {
  return await prisma.genre.findMany();
}

async function getGenreById(id) {
  return await prisma.genre.findUnique({
    where: {
      id: id,
    },
  });
}

async function createGenre(data) {
  return await prisma.genre.create({
    data: {
      name: data.name,
    },
  });
}

async function updateGenre(id, data) {
  return await prisma.genre.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
    },
  });
}

async function deleteGenre(id) {
  return await prisma.genre.delete({
    where: {
      id: parseInt(id),
    },
  });
}

export default {
  getallGenre,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
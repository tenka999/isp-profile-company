import prisma from "../config/database.js";

async function getAll() {
  return await prisma.promo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.promo.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(data) {
  return await prisma.promo.create({
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      diskon: parseInt(data.diskon),
      berlakuSampai: new Date(data.berlakuSampai),
    },
  });
}

async function update(id, data) {
  return await prisma.promo.update({
    where: {
      id: id,
    },
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      diskon: parseInt(data.diskon),
      berlakuSampai: new Date(data.berlakuSampai),
    },
  });
}

async function remove(id) {
  return await prisma.promo.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};

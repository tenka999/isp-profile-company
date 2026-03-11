import prisma from "../config/database.js";

async function getAll() {
  return await prisma.ulasan.findMany({
    include: {
      user: true,
      layanan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.ulasan.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
}

async function create(data) {
  return await prisma.ulasan.create({
    data: {
      userId: parseInt(data.userId),
      komentar: data.komentar,
      layananId: parseInt(data.layananId),
      rating: parseInt(data.rating),
    },
    include: {
      user: true,
    },
  });
}

async function update(id, data) {
  return await prisma.ulasan.update({
    where: {
      id: id,
    },
    data: {
      komentar: data.komentar,
      rating: parseInt(data.rating),
      status: data.status,
    },
    include: {
      user: true,
    },
  });
}

async function remove(id) {
  return await prisma.ulasan.delete({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
}

async function approve(id) {
  return await prisma.ulasan.update({
    where: {
      id: id,
    },
    data: {
      status: "APPROVED",
    },
    include: {
      user: true,
    },
  });
}

async function reject(id) {
  return await prisma.ulasan.update({
    where: {
      id: id,
    },
    data: {
      status: "REJECTED",
    },
    include: {
      user: true,
    },
  });
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  approve,
  reject,
};

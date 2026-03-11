import prisma from "../config/database.js";

async function getAll() {
  return await prisma.langganan.findMany({
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function getById(id) {
  return await prisma.langganan.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function create(data) {
  return await prisma.langganan.create({
    data: {
      userId: parseInt(data.userId),
      layananId: parseInt(data.layananId),
      alamatPemasangan: data.alamatPemasangan,
      status: data.status || "PENDING",
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function update(id, data) {
  return await prisma.langganan.update({
    where: {
      id: id,
    },
    data: {
      alamatPemasangan: data.alamatPemasangan,
      status: data.status,
      layananId: Number(data.layananId),
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function remove(id) {
  return await prisma.langganan.delete({
    where: {
      id: id,
    },
    include: {
      user: true,
      layanan: true,
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

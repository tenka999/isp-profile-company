import prisma from "../config/database.js";

async function getAll() {
  return await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.contact.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(data) {
  return await prisma.contact.create({
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      pesan: data.pesan,
      status: data.status || "NEW",
    },
  });
}

async function update(id, data) {
  return await prisma.contact.update({
    where: {
      id: id,
    },
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      pesan: data.pesan,
    },
  });
}

async function remove(id) {
  return await prisma.contact.delete({
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

import prisma from "../config/database.js";

async function getAll() {
  return await prisma.notif.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.notif.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
}

async function create(data) {
  console.log(data);
  return await prisma.notif.create({
    data: {
      userId: parseInt(data.userId),
      judul: data.judul,
      pesan: data.pesan,
      status: data.status || "UNREAD",
    },
    include: {
      user: true,
    },
  });
}

async function update(id, data) {
  return await prisma.notif.update({
    where: {
      id: id,
    },
    data: {
      judul: data.judul,
      pesan: data.pesan,
      status: data.status,
    },
    include: {
      user: true,
    },
  });
}

async function remove(id) {
  return await prisma.notif.delete({
    where: {
      id: id,
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
};

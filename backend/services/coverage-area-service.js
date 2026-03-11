import prisma from "../config/database.js";

async function getAll() {
  return await prisma.coverageArea.findMany();
}

async function getById(id) {
  return await prisma.coverageArea.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(data) {
  return await prisma.coverageArea.create({
    data: {
      namaArea: data.namaArea,
      status: data.status || "TERSEDIA",
    },
  });
}

async function update(id, data) {
  return await prisma.coverageArea.update({
    where: {
      id: id,
    },
    data: {
      namaArea: data.namaArea,
      status: data.status,
    },
  });
}

async function remove(id) {
  return await prisma.coverageArea.delete({
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

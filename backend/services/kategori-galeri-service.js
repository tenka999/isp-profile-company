import prisma from "../config/database.js";

async function getallKategoriGaleri() {
  return await prisma.kategoriGaleri.findMany();
}

async function getKategoriGaleriById(id) {
  return await prisma.kategoriGaleri.findUnique({
    where: {
      id: id,
    },
  });
}

async function createKategoriGaleri(data) {
  return await prisma.kategoriGaleri.create({
    data: {
      nama: data.nama,
      warna: data.warna,
    },
  });
}

async function updateKategoriGaleri(id, data) {
  return await prisma.kategoriGaleri.update({
    where: {
      id: id,
    },
    data: {
      nama: data.nama,
      warna: data.warna,
    },
  });
}

async function deleteKategoriGaleri(id) {
  return await prisma.kategoriGaleri.delete({
    where: {
      id: parseInt(id),
    },
  });
}

export default {
  getallKategoriGaleri,
  getKategoriGaleriById,
  createKategoriGaleri,
  updateKategoriGaleri,
  deleteKategoriGaleri,
};

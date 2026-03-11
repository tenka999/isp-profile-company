import prisma from "../config/database.js";
import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function getAll() {
  return await prisma.galeri.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      kategori: true,
    },
  });
}

async function getById(id) {
  return await prisma.galeri.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(data) {
  const kategori = JSON.parse(data.kategori);
  return await prisma.galeri.create({
    data: {
      judul: data.judul,
      gambar: data.gambar,
      deskripsi: data.deskripsi,

      kategori: kategori.id
        ? {
            connect: {
              id: kategori.id,
            },
          }
        : {
            create: {
              nama: kategori.nama,
              warna: kategori.warna,
            },
          },
    },
    include: {
      kategori: true,
    },
  });
}

async function update(id, data) {
  const kategori = JSON.parse(data.kategori);

  return await prisma.galeri.update({
    where: {
      id: id,
    },
    data: {
      judul: data.judul,
      gambar: data.gambar,
      deskripsi: data.deskripsi,

      kategori: kategori.id
        ? {
            connect: {
              id: kategori.id,
            },
          }
        : {
            create: {
              nama: kategori.nama,
              warna: kategori.warna,
            },
          },
    },
    include: {
      kategori: true,
    },
  });
}

async function remove(id) {
  const artikel = await prisma.galeri.findUnique({ where: { id: id } });

  if (artikel.gambar) {
    const filePath = path.join(__dirname, "../uploads/gallery", artikel.gambar);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
  return await prisma.galeri.delete({
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

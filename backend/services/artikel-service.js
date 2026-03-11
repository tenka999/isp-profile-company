import prisma from "../config/database.js";
import fs from "fs";
import path, { parse } from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function getAll() {
  return await prisma.artikel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.artikel.findUnique({
    where: {
      id: id,
    },
  });
}

async function getBySlug(slug) {
  return await prisma.artikel.findUnique({
    where: {
      slug: slug,
    },
  });
}

async function create(data) {
  const slug = slugify(data.judul, {
    lower: true,
    strict: true,
  });

  return await prisma.artikel.create({
    data: {
      judul: data.judul,
      slug,
      konten: data.konten,
      gambar: data.gambar,
      status: data.status || "DRAFT",
    },
  });
}
async function update(id, data) {
  const slug = slugify(data.judul, {
    lower: true,
    strict: true,
  });

  return await prisma.artikel.update({
    where: { id },
    data: {
      judul: data.judul,
      slug,
      konten: data.konten,
      gambar: data.gambar,
      status: data.status,
    },
  });
}

async function remove(id) {
  const artikel = await prisma.artikel.findUnique({ where: { id: id } });

  if (artikel.gambar) {
    const filePath = path.join(__dirname, "../uploads/article", artikel.gambar);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
  return await prisma.artikel.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  remove,
};

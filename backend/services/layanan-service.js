import prisma from "../config/database.js";

async function getAll() {
  return await prisma.layanan.findMany({
    include: {
      benefit: true,
    },
  });
}

async function getById(id) {
  return await prisma.layanan.findUnique({
    where: {
      id: id,
    },
    include: {
      benefit: true,
    },
  });
}

async function create(data) {
  console.log(JSON.parse(data.benefit));
  const benefit = JSON.parse(data.benefit);
  return await prisma.layanan.create({
    data: {
      namaLayanan: data.namaLayanan,
      hargaBulanan: parseInt(data.hargaBulanan),
      biayaInstalasi: parseInt(data.biayaInstalasi),
      kecepatanMbps: parseInt(data.kecepatanMbps),
      deskripsi: data.deskripsi,
      status: data.status || "AKTIF",

      benefit: {
        create: benefit?.map((b) => ({
          nama_benefit: b.nama_benefit,
        })),
      },
    },
    include: {
      benefit: true,
    },
  });
}

async function update(id, data) {
  const benefit = JSON.parse(data.benefit);
  await prisma.benefit.deleteMany({
    where: {
      layananId: id,
    },
  });

  return await prisma.layanan.update({
    where: {
      id: id,
    },
    data: {
      namaLayanan: data.namaLayanan,
      hargaBulanan: parseInt(data.hargaBulanan),
      biayaInstalasi: parseInt(data.biayaInstalasi),
      kecepatanMbps: parseInt(data.kecepatanMbps),
      deskripsi: data.deskripsi,
      status: data.status,

      benefit: {
        create: benefit?.map((b) => ({
          nama_benefit: b.nama_benefit,
        })),
      },
    },
    include: {
      benefit: true,
    },
  });
}

async function remove(id) {
  await prisma.benefit.deleteMany({
    where: {
      layananId: id,
    },
  });

  return await prisma.layanan.delete({
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

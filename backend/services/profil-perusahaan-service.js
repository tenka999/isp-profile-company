import prisma from "../config/database.js";

async function getAllProfilPerusahaan() {
  return await prisma.profilPerusahaan.findMany();
}

async function getProfilPerusahaanById(id) {
  return await prisma.profilPerusahaan.findUnique({
    where: {
      id: id,
    },
  });
}

async function createProfilPerusahaan(data) {
  return await prisma.profilPerusahaan.create({
    data: {
      namaPerusahaan: data.namaPerusahaan,
      deskripsi: data.deskripsi,
      alamat: data.alamat,
      telepon: data.telepon,
      email: data.email,
      logo: data.logo,
      lat: data.lat,
      lng: data.lng,
    },
  });
}

async function updateProfilPerusahaan(id, data) {
  return await prisma.profilPerusahaan.update({
    where: {
      id: id,
    },
    data: {
      namaPerusahaan: data.namaPerusahaan,
      deskripsi: data.deskripsi,
      alamat: data.alamat,
      telepon: data.telepon,
      email: data.email,
      logo: data.logo,
      lat: data.lat,
      lng: data.lng,
    },
  });
}

async function deleteProfilPerusahaan(id) {
  return await prisma.profilPerusahaan.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAllProfilPerusahaan,
  getProfilPerusahaanById,
  createProfilPerusahaan,
  updateProfilPerusahaan,
  deleteProfilPerusahaan,
};

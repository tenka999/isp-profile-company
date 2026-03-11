import prisma from "../config/database.js";
import bcrypt from "bcrypt";

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function createUser(data) {
  const hashedPass = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      password: hashedPass,
      role: data.role || "USER",
    },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      role: data.role,
    },
  });
}

async function deleteUser(id) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};

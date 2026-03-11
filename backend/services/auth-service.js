import prisma from "../config/database.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
async function registerUser(email, password, nama, telepon) {
  const hashedPass = await bcrypt.hash(password, 10);
  console.log(hashedPass, "hashedPass");
  console.log(nama, "nama");

  if (
    await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  )
    return { success: false, message: "Email sudah terdaftar" };

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
      telepon: telepon,
      nama: nama,
    },
    select: {
      id: true,
      email: true,
      nama: true,
    },
  });
  return user;
}
async function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: "Semua field harus diisi" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
      deletedAt: null,
    },
  });

  if (!user) {
    return { success: false, message: "Email tidak terdaftar" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Password salah" };
  }

  delete user.password;

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    nama: user.nama,
  });

  return {
    success: true,
    user,
    accessToken: token,
  };
}

export default { registerUser, loginUser };

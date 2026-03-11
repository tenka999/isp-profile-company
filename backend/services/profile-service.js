import prisma from "../config/database.js";
import fs from "fs";
import path from "path";

async function getAllProfile() {
  return await prisma.profile.findMany();
}

async function getProfileById(id) {
  console.log('id', id);
  const res = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    include: {
      user: true,
    },
  });
  // console.log('res', res);
  return res;
}

async function getProfileByEmail(email) {
  return await prisma.profile.findUnique({
    where: {
      email: email,
    },
  });
}

async function updateProfile(id,data) {
      const oldProfile = await prisma.profile.findUnique({
        where: { id: id },
      });

      // console.log(data, "dataservice");
      // hapus file lama kalau ada foto baru
      if (data.profileUrl && oldProfile?.profileUrl) {
        const oldPath = path.join(
          process.cwd(),
          "uploads/profile-pic",
          oldProfile.profileUrl
        );
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
  return await prisma.profile.update({
    where: {
      id: id,
    },
    data: {
        nim: data.nim,
        nidn: data.nidn,
        faculty: data.faculty,
        major: data.major,
        yearEntry: data.yearEntry,
        bio: data.bio,
        profileUrl: data.profileUrl,
        updatedById: data.updatedById
    },
  });
}
async function deleteProfile(id, deletedById) {
  return await prisma.profile.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
      deletedById: deletedById,
    },
  });
}

export default {
  getAllProfile,
  getProfileById,
  getProfileByEmail,
  updateProfile,
  deleteProfile,
};
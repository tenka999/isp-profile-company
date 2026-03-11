import prisma from "../config/database.js";

 async function getallCategory() {
    return await prisma.category.findMany();
}

 async function getCategoryById(id) {
  return await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
}



 async function createCategory(data) {
    return await prisma.category.create({
        data: {
            name: data.name
        }
    });
}

 async function updateCategory(id, data) {
    return await prisma.category.update({
        where: {
            id: id
        },
        data: {
            name: data.name
        }
    });
}

 async function deleteCategory(id) {
    return await prisma.category.delete({
        where: {
            id: parseInt(id)
        }
    });
}

export default { getallCategory, getCategoryById, createCategory, updateCategory, deleteCategory };
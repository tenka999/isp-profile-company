import prisma from "../config/database.js";

async function getMessages(ticketId) {
  return await prisma.customerServiceMessage.findMany({
    include: {
      sender: true,
      ticket: true,
    },
  });
}

async function create(data) {
  return await prisma.customerServiceMessage.create({
    data: {
      ticketId: parseInt(data.ticketId),
      senderId: parseInt(data.senderId),
      pesan: data.pesan,
    },
    include: {
      sender: true,
    },
  });
}

export default {
  create,
  getMessages,
};

import prisma from "../config/database.js";
import contactService from "../services/kontak-service.js";
import notifService from "../services/notif-service.js";
import { responseFormat } from "../utils/helper.js";

const contactController = {
  async getAll(req, res) {
    try {
      const data = await contactService.getAll();
      res.status(200).json(responseFormat("success", data, "Contact fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await contactService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Contact not found" });

      res.status(200).json(responseFormat("success", data, "Contact fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      await contactService.create(req.body);
      const data = {
        userId: Number(req.body.userId),
        judul: "Pesan baru",
        pesan: `Pesan baru dari ${req.body.nama}`,
      };
      console.log("data", req.body);
      // const notif = await contactService.createNotif(data);
      await notifService.create(data);

      res.status(201).json(responseFormat("success", data, "Contact created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async markAsRead(req, res) {
    try {
      const id = Number(req.params.id);

      const data = await prisma.contact.update({
        where: { id },
        data: { status: req.body.status },
      });

      res.status(200).json(responseFormat("success", data, "Notif Created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async markAsNote(req, res) {
    try {
      const id = Number(req.params.id);
      const { catatanAdmin } = req.body;
      await prisma.contact.update({
        where: { id },
        data: { catatanAdmin, status: "READ" },
      });

      res.status(200).json(responseFormat("success", data, "Notif updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await contactService.update(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", data, "Contact updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await contactService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Contact deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async deletes(req, res) {
    try {
      const { ids } = req.body;
      console.log("ids", ids);

      if (!ids || !ids.length) {
        return res.status(400).json({
          success: false,
          message: "IDs kosong",
        });
      }

      await prisma.contact.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.json({
        success: true,
        message: "Contact berhasil dihapus",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};

export default contactController;

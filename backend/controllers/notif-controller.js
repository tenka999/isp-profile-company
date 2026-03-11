import prisma from "../config/database.js";
import notifService from "../services/notif-service.js";
import { responseFormat } from "../utils/helper.js";

const notifController = {
  async getAll(req, res) {
    try {
      const data = await notifService.getAll();
      res.status(200).json(responseFormat("success", data, "Notif fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await notifService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Notif not found" });

      res.status(200).json(responseFormat("success", data, "Notif fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await notifService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Notif created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await notifService.update(parseInt(req.params.id), req.body);

      res.status(200).json(responseFormat("success", data, "Notif updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async markAsRead(req, res) {
    try {
      // const data = await notifService.update(parseInt(req.params.id), req.body);
      const id = Number(req.params.id);
      await prisma.notif.update({
        where: { id },
        data: { status: "READ" },
      });
      res.status(200).json(responseFormat("success", data, "Notif updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await notifService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Notif deleted"));
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

      await prisma.notif.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.json({
        success: true,
        message: "Artikel berhasil dihapus",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};

export default notifController;

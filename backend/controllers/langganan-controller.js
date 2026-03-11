import prisma from "../config/database.js";
import langgananService from "../services/langganan-service.js";
import { responseFormat } from "../utils/helper.js";

const langgananController = {
  async getAll(req, res) {
    try {
      const data = await langgananService.getAll();
      res
        .status(200)
        .json(responseFormat("success", data, "Langganan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await langgananService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Langganan not found" });

      res
        .status(200)
        .json(responseFormat("success", data, "Langganan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await langgananService.create(req.body);

      res
        .status(201)
        .json(responseFormat("success", data, "Langganan created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await langgananService.update(
        parseInt(req.params.id),
        req.body,
      );

      res
        .status(200)
        .json(responseFormat("success", data, "Langganan updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await langgananService.remove(parseInt(req.params.id));

      res
        .status(200)
        .json(responseFormat("success", data, "Langganan deleted"));
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

      await prisma.langganan.deleteMany({
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

export default langgananController;

import prisma from "../config/database.js";
import coverageAreaService from "../services/coverage-area-service.js";
import { responseFormat } from "../utils/helper.js";

const coverageAreaController = {
  async getAll(req, res) {
    try {
      const data = await coverageAreaService.getAll();
      res
        .status(200)
        .json(responseFormat("success", data, "Coverage area fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await coverageAreaService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Coverage area not found" });

      res
        .status(200)
        .json(responseFormat("success", data, "Coverage area fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await coverageAreaService.create(req.body);

      res
        .status(201)
        .json(responseFormat("success", data, "Coverage area created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await coverageAreaService.update(
        parseInt(req.params.id),
        req.body,
      );

      res
        .status(200)
        .json(responseFormat("success", data, "Coverage area updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await coverageAreaService.remove(parseInt(req.params.id));

      res
        .status(200)
        .json(responseFormat("success", data, "Coverage area deleted"));
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

      await prisma.coverageArea.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.json({
        success: true,
        message: "Coverage area berhasil dihapus",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};

export default coverageAreaController;

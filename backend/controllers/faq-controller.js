import prisma from "../config/database.js";
import faqService from "../services/faq-service.js";
import { responseFormat } from "../utils/helper.js";

const faqController = {
  async getAll(req, res) {
    try {
      const data = await faqService.getAll();
      res.status(200).json(responseFormat("success", data, "FAQ fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await faqService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "FAQ not found" });

      res.status(200).json(responseFormat("success", data, "FAQ fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await faqService.create(req.body);

      res.status(201).json(responseFormat("success", data, "FAQ created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await faqService.update(parseInt(req.params.id), req.body);

      res.status(200).json(responseFormat("success", data, "FAQ updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async updateOrder(req, res) {
    try {
      const data = await faqService.updateOrder(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", data, "FAQ updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async updateActive(req, res) {
    console.log("req", req);
    try {
      const data = await faqService.updateActive(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", data, "FAQ updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async updateViews(req, res) {
    try {
      const data = await faqService.updateViews(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "FAQ updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await faqService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "FAQ deleted"));
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

      await prisma.faq.deleteMany({
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

export default faqController;

import ulasanService from "../services/ulasan-service.js";
import { responseFormat } from "../utils/helper.js";

const ulasanController = {
  async getAll(req, res) {
    try {
      const data = await ulasanService.getAll();
      res.status(200).json(responseFormat("success", data, "Ulasan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await ulasanService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Ulasan not found" });

      res.status(200).json(responseFormat("success", data, "Ulasan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await ulasanService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Ulasan created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await ulasanService.update(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", data, "Ulasan updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await ulasanService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Ulasan deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async approve(req, res) {
    console.log("id");
    try {
      const data = await ulasanService.approve(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Ulasan approved"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async reject(req, res) {
    try {
      const data = await ulasanService.reject(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Ulasan rejected"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default ulasanController;

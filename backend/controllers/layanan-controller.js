import layananService from "../services/layanan-service.js";
import { responseFormat } from "../utils/helper.js";

const layananController = {
  async getAll(req, res) {
    try {
      const data = await layananService.getAll();
      res.status(200).json(responseFormat("success", data, "Layanan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await layananService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Layanan not found" });

      res.status(200).json(responseFormat("success", data, "Layanan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await layananService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Layanan created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await layananService.update(
        parseInt(req.params.id),
        req.body,
      );

      res.status(200).json(responseFormat("success", data, "Layanan updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await layananService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Layanan deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default layananController;

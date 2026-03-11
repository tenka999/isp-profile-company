import galeriService from "../services/galeri-service.js";
import { responseFormat } from "../utils/helper.js";

const galeriController = {
  async getAll(req, res) {
    try {
      const data = await galeriService.getAll();
      res.status(200).json(responseFormat("success", data, "Galeri fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await galeriService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Galeri not found" });

      res.status(200).json(responseFormat("success", data, "Galeri fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.gambar = req.file.filename;
      }

      const result = await galeriService.create(data);

      res.status(201).json(responseFormat("success", result, "Galeri created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.gambar = req.file.filename;
      }

      const result = await galeriService.update(parseInt(req.params.id), data);

      res.status(200).json(responseFormat("success", result, "Galeri updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await galeriService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", result, "Galeri deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default galeriController;

import profilPerusahaanService from "../services/profil-perusahaan-service.js";
import { responseFormat } from "../utils/helper.js";

const profilPerusahaanController = {
  async getAll(req, res) {
    try {
      const data = await profilPerusahaanService.getAllProfilPerusahaan();
      res
        .status(200)
        .json(responseFormat("success", data, "Profil perusahaan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await profilPerusahaanService.getProfilPerusahaanById(
        parseInt(req.params.id),
      );

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Profil perusahaan not found" });

      res
        .status(200)
        .json(responseFormat("success", data, "Profil perusahaan fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await profilPerusahaanService.createProfilPerusahaan(
        req.body,
      );

      res
        .status(201)
        .json(responseFormat("success", data, "Profil perusahaan created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await profilPerusahaanService.updateProfilPerusahaan(
        parseInt(req.params.id),
        req.body,
      );

      res
        .status(200)
        .json(responseFormat("success", data, "Profil perusahaan updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await profilPerusahaanService.deleteProfilPerusahaan(
        parseInt(req.params.id),
      );

      res
        .status(200)
        .json(responseFormat("success", data, "Profil perusahaan deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default profilPerusahaanController;

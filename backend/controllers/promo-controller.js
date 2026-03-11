import promoService from "../services/promo-service.js";
import { responseFormat } from "../utils/helper.js";

const promoController = {
  async getAll(req, res) {
    try {
      const data = await promoService.getAll();
      res.status(200).json(responseFormat("success", data, "Promo fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await promoService.getById(parseInt(req.params.id));

      if (!data)
        return res
          .status(404)
          .json({ success: false, message: "Promo not found" });

      res.status(200).json(responseFormat("success", data, "Promo fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await promoService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Promo created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await promoService.update(parseInt(req.params.id), req.body);

      res.status(200).json(responseFormat("success", data, "Promo updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await promoService.remove(parseInt(req.params.id));

      res.status(200).json(responseFormat("success", data, "Promo deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default promoController;

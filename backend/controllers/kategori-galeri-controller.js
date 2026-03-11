// controllers/genreController.js
import kategoriGaleriService from "../services/kategori-galeri-service.js";
import { responseFormat } from "../utils/helper.js";

const kategoriGaleriController = {
  // GET /genres
  async getKategoriGaleri(req, res) {
    try {
      const genres = await kategoriGaleriService.getallKategoriGaleri();
      res
        .status(200)
        .json(responseFormat("success", genres, "All genres fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /genres/:id
  async getKategoriGaleriById(req, res) {
    try {
      const genre = await kategoriGaleriService.getKategoriGaleriById(
        parseInt(req.params.id),
      );
      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", genre, "Genre fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /genres
  async creaateKategoriGaleri(req, res) {
    try {
      const genre = await kategoriGaleriService.createKategoriGaleri(
        req.body,
        req.user?.id,
      );
      res.status(201).json(responseFormat("success", genre, "Genre created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /genres/:id
  async updateKategoriGaleri(req, res) {
    try {
      const genre = await kategoriGaleriService.updateKategoriGaleri(
        parseInt(req.params.id),
        req.body,
        req.user?.id,
      );
      res.status(200).json(responseFormat("success", genre, "Genre updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /genres/:id
  async deleteKategoriGaleri(req, res) {
    try {
      const genre = await kategoriGaleriService.deleteKategoriGaleri(
        parseInt(req.params.id),
        req.user?.id,
      );
      res.status(200).json(responseFormat("success", genre, "Genre deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default kategoriGaleriController;

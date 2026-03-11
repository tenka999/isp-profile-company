// controllers/genreController.js
import genreService from "../services/genre-service.js";
import { responseFormat } from "../utils/helper.js";

const genreController = {
  // GET /genres
  async getGenre(req, res) {
    try {
      const genres = await genreService.getallGenre();
      res
        .status(200)
        .json(responseFormat("success", genres, "All genres fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /genres/:id
  async getGenreById(req, res) {
    try {
      const genre = await genreService.getGenreById(parseInt(req.params.id));
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
  async createGenre(req, res) {
    try {
      const genre = await genreService.createGenre(req.body, req.user?.id);
      res.status(201).json(responseFormat("success", genre, "Genre created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /genres/:id
  async updateGenre(req, res) {
    try {
      const genre = await genreService.updateGenre(
        parseInt(req.params.id),
        req.body,
        req.user?.id
      );
      res.status(200).json(responseFormat("success", genre, "Genre updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /genres/:id
  async deleteGenre(req, res) {
    try {
      const genre = await genreService.deleteGenre(
        parseInt(req.params.id),
        req.user?.id
      );
      res.status(200).json(responseFormat("success", genre, "Genre deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default genreController;
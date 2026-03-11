// controllers/likedBookController.js
import likedBookService from "../services/liked-book-service.js";
import { responseFormat } from "../utils/helper.js";

const likedBookController = {
  // GET /liked-books
  async getAllLikedBook(req, res) {
    try {
      const likedBooks = await likedBookService.getAllLikedBook();
      res
        .status(200)
        .json(responseFormat("success", likedBooks, "All liked books fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-books/:id
  async getLikedBookById(req, res) {
    try {
      const likedBook = await likedBookService.getLikedBookById(parseInt(req.params.id));
      if (!likedBook) {
        return res
          .status(404)
          .json({ success: false, message: "Liked book not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", likedBook, "Liked book fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-books/user/:id
  async getTotalLikedByUser(req, res) {
    try {
      const total = await likedBookService.getTotalLikedByUser(parseInt(req.params.id));
      res
        .status(200)
        .json(
          responseFormat("success", total, "Total liked books by user fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-books/book/:id
  async getTotalLikedByBook(req, res) {
    try {
      const total = await likedBookService.getTotalLikedByBook(parseInt(req.params.id));
      res
        .status(200)
        .json(responseFormat("success", total, "Total liked by book fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /liked-books/toggle
  async toggleLikeBook(req, res) {
    try {
      const likedBook = await likedBookService.toggleLike(req.body, req.user?.id);
      res
        .status(201)
        .json(responseFormat("success", likedBook, "Like/unlike book toggled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default likedBookController;
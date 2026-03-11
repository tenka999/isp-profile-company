// controllers/detailBookController.js
import detailBookService from "../services/detail-book-service.js";
import { responseFormat } from "../utils/helper.js";

const detailBookController = {
  // GET /booksdetail
  async getAllDetailBook(req, res) {
    try {
      const detailBooks = await detailBookService.getAllDetailBook();
      res
        .status(200)
        .json(
          responseFormat("success", detailBooks, "All detail books fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /booksdetail/:id
  async getOneDetailBook(req, res) {
    try {
      const detailBook = await detailBookService.getDetailBookById(parseInt(req.params.id));
      if (!detailBook) {
        return res
          .status(404)
          .json({ success: false, message: "Detail book not found" });
      }
      res
        .status(200)
        .json(
          responseFormat("success", [detailBook], "Detail book fetched by id")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /booksdetail/deleted
  async getDetailBookByDeleted(req, res) {
    try {
      const detailBooks = await detailBookService.deleteDetailBookById();
      res
        .status(200)
        .json(
          responseFormat("success", detailBooks, "Deleted detail books fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /booksdetail/exist
  async getDetailBookByExist(req, res) {
    try {
      const detailBooks = await detailBookService.getDetailBookByExist();
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            detailBooks,
            "Existing detail books fetched"
          )
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /booksdetail
  async createDetailBook(req, res) {
    try {
      const detailBook = await detailBookService.createDetailBook(req.body, req.user?.id);
      res
        .status(201)
        .json(responseFormat("success", detailBook, "Detail book created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /booksdetail/:id
  async updateDetailBook(req, res) {
    try {
      const detailBook = await detailBookService.updateDetailBook(
        parseInt(req.params.id),
        req.body,
        req.user?.id
      );
      res
        .status(200)
        .json(responseFormat("success", detailBook, "Detail book updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /booksdetail/:id
  async deleteDetailBook(req, res) {
    try {
      const detailBook = await detailBookService.deleteDetailBookById(
        parseInt(req.params.id),
        req.user?.id
      );
      res
        .status(200)
        .json(responseFormat("success", detailBook, "Detail book deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default detailBookController;
// controllers/borrowingController.js
import borrowingService from "../services/borrowing-service.js";
import { responseFormat } from "../utils/helper.js";

const borrowingController = {
  // GET /borrowings
  async getAllBorrowing(req, res) {
    try {
      const borrowings = await borrowingService.getAllBorrowing(parseInt(req.user.id));
      res
        .status(200)
        .json(responseFormat("success", borrowings, "All borrowings fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /borrowings/status/:status
  async getAllBorrowingByStatus(req, res) {
    try {
      const { status } = req.params;
      const borrowings = await borrowingService.getAllBorrowingByStatus(status, parseInt(req.user.id));
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            borrowings,
            `Borrowings with status ${status}`
          )
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /borrowings/deleted
  async getBorrowingDeleted(req, res) {
    try {
      const borrowings = await borrowingService.getBorrowingDeleted(parseInt(req.user.id));
      res
        .status(200)
        .json(
          responseFormat("success", borrowings, "Deleted borrowings fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /borrowings/exist
  async getAllBorrowingExist(req, res) {
    try {
      const borrowings = await borrowingService.getAllBorrowingExist(parseInt(req.user.id));
      res
        .status(200)
        .json(
          responseFormat("success", borrowings, "Existing borrowings fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /borrowings/:id
  async getBorrowingById(req, res) {
    try {
      const borrowing = await getBorrowingById(
        parseInt(req.params.id),
        parseInt(req.user.id)
      );
      res
        .status(200)
        .json(responseFormat("success", borrowing, "Borrowing fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /borrowings
  async createBorrowing(req, res) {
    try {
      const borrowing = await borrowingService.createBorrowing(parseInt(req.user.id), req.body);
      res
        .status(201)
        .json(responseFormat("success", borrowing, "Borrowing created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /borrowings/:id
  async updateBorrowing(req, res) {
    try {
      const borrowing = await borrowingService.updateBorrowingById(
        parseInt(req.params.id),
        req.body,
        parseInt(req.user.id)
      );
      res
        .status(200)
        .json(responseFormat("success", borrowing, "Borrowing updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /borrowings/:id
  async deleteBorrowing(req, res) {
    try {
      const borrowing = await borrowingService.deleteBorrowingById(
        parseInt(req.params.id),
        parseInt(req.user.id)
      );
      res
        .status(200)
        .json(responseFormat("success", borrowing, "Borrowing deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default borrowingController;
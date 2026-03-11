// controllers/reviewController.js
import reviewService from "../services/review-service.js";
import { responseFormat } from "../utils/helper.js";

const reviewController = {
  // GET /reviews
  async getAllReview(req, res) {
    try {
      const reviews = await reviewService.getAllReview();
      res
        .status(200)
        .json(responseFormat("success", reviews, "All reviews fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/book/:bookId
  async getAllReviewByBookId(req, res) {
    try {
      const reviews = await reviewService.getAllReviewByBookId(parseInt(req.params.bookId));
      res
        .status(200)
        .json(responseFormat("success", reviews, "Reviews by book fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/user/:userId
  async getReviewByUserId(req, res) {
    try {
      const reviews = await reviewService.getReviewByUserId(parseInt(req.params.userId));
      res
        .status(200)
        .json(responseFormat("success", reviews, "Reviews by user fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/parent/:parentId
  async getAllReviewByParentId(req, res) {
    try {
      const reviews = await reviewService.getAllReviewByParentId(
        parseInt(req.params.parentId)
      );
      res
        .status(200)
        .json(responseFormat("success", reviews, "Reviews by parent fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/exist
  async getReviewByExist(req, res) {
    try {
      const reviews = await reviewService.getReviewByExist();
      res
        .status(200)
        .json(responseFormat("success", reviews, "Existing reviews fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/deleted
  async getAllReviewDeleted(req, res) {
    try {
      const reviews = await reviewService.getAllReviewDeleted();
      res
        .status(200)
        .json(responseFormat("success", reviews, "Deleted reviews fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/:id
  async getReviewById(req, res) {
    try {
      const review = await reviewService.getReviewById(parseInt(req.params.id));
      if (!review) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", review, "Review fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /reviews (upsert -> create/update)
  async upsertReview(req, res) {
    try {
      const review = await reviewService.upsertReview(req.body, req.user?.id);
      res
        .status(201)
        .json(responseFormat("success", review, "Review created/updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /reviews/:id
  async deleteReview(req, res) {
    try {
      const review = await reviewService.deleteUser(
        parseInt(req.params.id),
        req.user?.id
      );
      res.status(200).json(responseFormat("success", review, "Review deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default reviewController;
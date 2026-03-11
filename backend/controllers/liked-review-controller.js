// controllers/likedReviewController.js
import likedReviewService from "../services/liked-review-service.js";
import { responseFormat } from "../utils/helper.js";

const likedReviewController = {
  // GET /liked-reviews
  async getAllLikeReview(req, res) {
    try {
      const likedReviews = await likedReviewService.getAllLikeReview();
      res
        .status(200)
        .json(
          responseFormat("success", likedReviews, "All liked reviews fetched")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-reviews/:id
  async getLikedReviewById(req, res) {
    try {
      const likedReview = await likedReviewService.getLikedReviewById(parseInt(req.params.id));
      if (!likedReview) {
        return res
          .status(404)
          .json({ success: false, message: "Liked review not found" });
      }
      res
        .status(200)
        .json(
          responseFormat("success", likedReview, "Liked review fetched by id")
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-reviews/user/:id
  async getTotalLikedReviewByUser(req, res) {
    try {
      const total = await likedReviewService.getTotalLikedReviewByUser(parseInt(req.params.id));
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            total,
            "Total liked reviews by user fetched"
          )
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /liked-reviews/book/:id
  async getTotalLikedReviewByBook(req, res) {
    try {
      const total = await likedReviewService.getTotalLikedReviewByBook(parseInt(req.params.id));
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            total,
            "Total liked reviews by book fetched"
          )
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /liked-reviews/toggle
  async toggleLikeReview(req, res) {
    try {
      const likedReview = await likedReviewService.toggleLikeReview(req.body, req.user?.id);
      res
        .status(201)
        .json(responseFormat("success", likedReview, "Like/unlike toggled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default likedReviewController;
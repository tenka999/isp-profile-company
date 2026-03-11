import loginUser from "../controllers/user-login-regis-controller.js";
import express from "express";
import Books from "../controllers/books-controller.js";
import detailBookController from "../controllers/detail-book-controller.js";
import reviewController from "../controllers/review-controller.js";
import likedBookController from "../controllers/liked-book-controller.js";
import likedReviewController from "../controllers/liked-review-controller.js";
import genreController from "../controllers/genre-controller.js";
import categoryController from "../controllers/category-controller.js";

import { Router } from "express";
import contactController from "../controllers/kontak-controller.js";
import galeriController from "../controllers/galeri-controller.js";
import customerServiceMessageController from "../controllers/cs-message-controller.js";
import ulasanController from "../controllers/ulasan-controller.js";
import coverageAreaController from "../controllers/coverage-area-controller.js";
import artikelController from "../controllers/artikel-controller.js";

const publicRouter = Router();

//#region Auth
publicRouter.use("/login", loginUser.loginUser);
publicRouter.use("/register", loginUser.registerUser);
//#endregion Auth

//#region Uploads
publicRouter.use("/coverbook", express.static("uploads/cover-book"));
publicRouter.use("/pdfbook", express.static("uploads/pdf-book"));
publicRouter.use("/profilepic", express.static("uploads/profile-pic"));
publicRouter.use("/article", express.static("uploads/article"));
publicRouter.use("/gallery", express.static("uploads/gallery"));
//#endregion Uploads

publicRouter.post("/contact", contactController.create);

publicRouter.get("/galeri", galeriController.getAll);

//#region Book
publicRouter.get("/books", Books.getAll);
publicRouter.get("/books/deleted", Books.getAllDeleted);
publicRouter.get("/books/updated", Books.getAllUpdated);
publicRouter.get("/books/exist", Books.getAllExist);
publicRouter.get("/books/:id", Books.getOne);
//#endregion Book

//#region Detail Book
publicRouter.get("/booksdetail", detailBookController.getAllDetailBook);
publicRouter.get(
  "/booksdetail/deleted",
  detailBookController.getDetailBookByDeleted,
);
publicRouter.get(
  "/booksdetail/exist",
  detailBookController.getDetailBookByExist,
);
publicRouter.get("/booksdetail/:id", detailBookController.getOneDetailBook);
//#endregion Detail Book

//#region Review
publicRouter.get("/reviews", reviewController.getAllReview);
publicRouter.get(
  "/reviews/book/:bookId",
  reviewController.getAllReviewByBookId,
);
publicRouter.get("/reviews/user/:userId", reviewController.getReviewByUserId);
publicRouter.get(
  "/reviews/parent/:parentId",
  reviewController.getAllReviewByParentId,
);
publicRouter.get("/reviews/exist", reviewController.getReviewByExist);
publicRouter.get("/reviews/deleted", reviewController.getAllReviewDeleted);
publicRouter.get("/reviews/:id", reviewController.getReviewById);
//#endregion Review

//#region Liked Book
publicRouter.get("/liked-books", likedBookController.getAllLikedBook);
publicRouter.get("/liked-books/:id", likedBookController.getLikedBookById);
publicRouter.get(
  "/liked-books/user/:id",
  likedBookController.getTotalLikedByUser,
);
publicRouter.get(
  "/liked-books/book/:id",
  likedBookController.getTotalLikedByBook,
);
publicRouter.post("/liked-books/toggle", likedBookController.toggleLikeBook);
//#endregion Liked Book

//#region Liked Review
publicRouter.get("/liked-reviews", likedReviewController.getAllLikeReview);
publicRouter.get(
  "/liked-reviews/:id",
  likedReviewController.getLikedReviewById,
);
publicRouter.get(
  "/liked-reviews/user/:id",
  likedReviewController.getTotalLikedReviewByUser,
);
publicRouter.get(
  "/liked-reviews/book/:id",
  likedReviewController.getTotalLikedReviewByBook,
);
publicRouter.post(
  "/liked-reviews/toggle",
  likedReviewController.toggleLikeReview,
);
//#endregion Liked Review

//#region Genre
publicRouter.get("/genres", genreController.getGenre);
publicRouter.get("/genres/:id", genreController.getGenreById);
//#endregion Genre

//#region Category
publicRouter.get("/categories", categoryController.getCategory);
publicRouter.get("/categories/:id", categoryController.getCategoryById);
//#endregion Category

// publicRouter.put("/ulasan/approve/:id", ulasanController.approve);
// publicRouter.put("/ulasan/reject/:id", ulasanController.reject);

publicRouter.get("/coverage-area", coverageAreaController.getAll);

publicRouter.get("/cs-message", customerServiceMessageController.getAll);
publicRouter.post("/cs-message", customerServiceMessageController.create);

publicRouter.get("/artikel", artikelController.getAll);
publicRouter.get("/article/:slug", artikelController.getBySlug);

export default publicRouter;

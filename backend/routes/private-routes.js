import Books from "../controllers/books-controller.js";
import detailBookController from "../controllers/detail-book-controller.js";
import genreController from "../controllers/genre-controller.js";
import categoryController from "../controllers/category-controller.js";
import usersController from "../controllers/users-controller.js";
import reviewController from "../controllers/review-controller.js";
import profileController from "../controllers/profile-controller.js";
import borrowingController from "../controllers/borrowing-controller.js";
import likedBookController from "../controllers/liked-book-controller.js";
import likedReviewController from "../controllers/liked-review-controller.js";
import wishlistController from "../controllers/wishlist-controller.js";
import annotationController from "../controllers/annotation-controller.js";
import profilPerusahaanController from "../controllers/profil-perusahaan-controller.js";
import layananController from "../controllers/layanan-controller.js";
import langgananController from "../controllers/langganan-controller.js";
import galeriController from "../controllers/galeri-controller.js";
import ulasanController from "../controllers/ulasan-controller.js";
import artikelController from "../controllers/artikel-controller.js";
import faqController from "../controllers/faq-controller.js";
import contactController from "../controllers/kontak-controller.js";
import notifController from "../controllers/notif-controller.js";
import coverageAreaController from "../controllers/coverage-area-controller.js";
import promoController from "../controllers/promo-controller.js";
import customerServiceTicketController from "../controllers/cs-ticket-controller.js";
import customerServiceMessageController from "../controllers/cs-message-controller.js";

import {
  coverBook,
  uploadArticle,
  uploadGallery,
  uploadPdf,
  uploadProfile,
} from "../middlewares/cover-book.js";
import { Router } from "express";
import authMiddleWare from "../middlewares/auth.js";
import kategoriGaleriController from "../controllers/kategori-galeri-controller.js";

const privateRouter = Router();

privateRouter.use(authMiddleWare);

//#region Book
privateRouter.post(
  "/books",
  coverBook.single("cover"),
  uploadPdf.single("pdf"),
  Books.create,
);
privateRouter.put(
  "/books/:id",
  coverBook.single("cover"),
  uploadPdf.single("pdf"),
  Books.updateOne,
);
privateRouter.delete("/books/:id", Books.deleteOne);
//#endregion Book

//#region artikel
// privateRouter.get("/artikel", artikelController.getAll);
privateRouter.get("/artikel/:id", artikelController.getById);

privateRouter.post(
  "/artikel",
  uploadArticle.single("gambar"),
  artikelController.create,
);

privateRouter.put(
  "/artikel/:id",
  uploadArticle.single("gambar"),
  artikelController.update,
);

privateRouter.delete("/artikel/multiple-delete", artikelController.deletes);
privateRouter.delete("/artikel/:id", artikelController.delete);

//#endregion artikel

//#region faq
privateRouter.get("/faq", faqController.getAll);
privateRouter.get("/faq/:id", faqController.getById);
privateRouter.post("/faq", faqController.create);
privateRouter.put("/faq/:id", faqController.update);
privateRouter.put("/faq/:id/order", faqController.updateOrder);
privateRouter.put("/faq/:id/active", faqController.updateActive);
privateRouter.put("/faq/:id/views", faqController.updateViews);
privateRouter.delete("/faq/multiple-delete", faqController.deletes);
privateRouter.delete("/faq/:id", faqController.delete);
//#endregion faq

//#region promo
privateRouter.get("/promo", promoController.getAll);
privateRouter.get("/promo/:id", promoController.getById);
privateRouter.post("/promo", promoController.create);
privateRouter.put("/promo/:id", promoController.update);
privateRouter.delete("/promo/:id", promoController.delete);
//#endregion promo

//#region cs-ticket
privateRouter.get("/cs-ticket", customerServiceTicketController.getAll);
privateRouter.get("/cs-ticket/:id", customerServiceTicketController.getById);
privateRouter.post("/cs-ticket", customerServiceTicketController.create);
privateRouter.put(
  "/cs-ticket/:id",
  customerServiceTicketController.updateTicket,
);
// privateRouter.put("/cs-ticket/:id", customerServiceTicketController.update);
privateRouter.delete("/cs-ticket/:id", customerServiceTicketController.delete);
//#endregion cs-ticket

//#region cs-message
//#endregion cs-message

//#region contact
privateRouter.get("/contact", contactController.getAll);
privateRouter.get("/contact/:id", contactController.getById);
privateRouter.put("/contact/:id", contactController.update);
privateRouter.delete("/contact/multiple-delete", contactController.deletes);
privateRouter.delete("/contact/:id", contactController.delete);
privateRouter.patch("/contact/:id/status", contactController.markAsRead);
privateRouter.put("/contact/:id/note", contactController.markAsNote);
//#endregion contact
//#region contact
privateRouter.get(
  "/kategori-galeri",
  kategoriGaleriController.getKategoriGaleri,
);
privateRouter.get(
  "/kategori-galeri/:id",
  kategoriGaleriController.getKategoriGaleriById,
);
privateRouter.post(
  "/kategori-galeri",
  kategoriGaleriController.creaateKategoriGaleri,
);
privateRouter.put(
  "/kategori-galeri/:id",
  kategoriGaleriController.updateKategoriGaleri,
);
privateRouter.delete(
  "/kategori-galeri/:id",
  kategoriGaleriController.deleteKategoriGaleri,
);
//#endregion contact

//#region notif
privateRouter.get("/notif", notifController.getAll);
privateRouter.get("/notif/:id", notifController.getById);
privateRouter.post("/notif", notifController.create);
privateRouter.post("/notif", notifController.create);
privateRouter.put("/notif/:id", notifController.update);
privateRouter.put("/notif/:id/read", notifController.markAsRead);
privateRouter.delete("/notif/multiple-delete", notifController.deletes);
privateRouter.delete("/notif/:id", notifController.delete);
//#endregion notif

//#region coverage-area
privateRouter.get("/coverage-area/:id", coverageAreaController.getById);
privateRouter.post("/coverage-area", coverageAreaController.create);
privateRouter.put("/coverage-area/:id", coverageAreaController.update);
privateRouter.delete(
  "/coverage-area/multiple-delete",
  coverageAreaController.deletes,
);
privateRouter.delete("/coverage-area/:id", coverageAreaController.delete);
//#endregion coverage-area

//#region galeri
privateRouter.post(
  "/galeri",
  uploadGallery.single("gambar"),
  galeriController.create,
);

privateRouter.put(
  "/galeri/:id",
  uploadGallery.single("gambar"),
  galeriController.update,
);

privateRouter.delete("/galeri/:id", galeriController.delete);
//#endregion galeri

//#region ulasan
privateRouter.get("/ulasan", ulasanController.getAll);
privateRouter.get("/ulasan/:id", ulasanController.getById);
privateRouter.post("/ulasan", ulasanController.create);
privateRouter.put("/ulasan/:id", ulasanController.update);
privateRouter.put("/ulasan/approve/:id", ulasanController.approve);
privateRouter.put("/ulasan/reject/:id", ulasanController.reject);
privateRouter.delete("/ulasan/:id", ulasanController.delete);
//#endregion ulasan

//#region Detail Book
privateRouter.post("/booksdetail", detailBookController.createDetailBook);
privateRouter.put("/booksdetail/:id", detailBookController.updateDetailBook);
privateRouter.delete("/booksdetail/:id", detailBookController.deleteDetailBook);
//#endregion Detail Book

//#region Review
privateRouter.post("/reviews", reviewController.upsertReview); // bisa create/update
privateRouter.delete("/reviews/:id", reviewController.deleteReview);
//#endregion Review

//#region Annotation
privateRouter.get("/annotations", annotationController.getallAnnotation);
privateRouter.get("/annotations/:id", annotationController.getAnnotationById);
privateRouter.get(
  "/annotations/book/:bookId",
  annotationController.getAnnotationByBookId,
);
privateRouter.post("/annotations", annotationController.createAnnotation);
privateRouter.put("/annotations/:id", annotationController.updateAnnotation);
privateRouter.delete("/annotations/:id", annotationController.deleteAnnotation);
//#endregion Annotation

//#region Wishlist
privateRouter.get("/wishlists", wishlistController.getAllWishlist);
privateRouter.get("/wishlists/:id", wishlistController.getWishlistById);
//#endregion Wishlist

//#region Profile
privateRouter.get("/profiles", profileController.getAllProfile);
privateRouter.get("/profiles/:id", profileController.getProfileById);
privateRouter.get(
  "/profiles/email/:email",
  profileController.getProfileByEmail,
);
privateRouter.put(
  "/profiles/:id",
  uploadProfile.single("foto"),
  profileController.updateProfile,
);
privateRouter.delete("/profiles/:id", profileController.deleteProfile);
//#endregion Profile

//#region Borrow
privateRouter.get("/borrowings", borrowingController.getAllBorrowing);
privateRouter.get(
  "/borrowings/status/:status",
  borrowingController.getAllBorrowingByStatus,
);
privateRouter.get(
  "/borrowings/deleted",
  borrowingController.getBorrowingDeleted,
);
privateRouter.get(
  "/borrowings/exist",
  borrowingController.getAllBorrowingExist,
);
privateRouter.get("/borrowings/:id", borrowingController.getBorrowingById);
privateRouter.post("/borrowings", borrowingController.createBorrowing);
privateRouter.put("/borrowings/:id", borrowingController.updateBorrowing);
privateRouter.delete("/borrowings/:id", borrowingController.deleteBorrowing);
//#endregion Borrow

//#region Approval
//#endregion Approval

//#region user
privateRouter.get("/users", usersController.getAllUsers);
privateRouter.get("/users/:id", usersController.getUserById);
privateRouter.get("/users/email/:email", usersController.getUserByEmail);
privateRouter.post("/users", usersController.createUser);
privateRouter.put("/users/:id", usersController.updateUser);
privateRouter.delete("/users/:id", usersController.deleteUser);
privateRouter.post(
  "/users/multiple-delete",
  usersController.deleteSelectedUsers,
);
privateRouter.post(
  "/users/multiple-restore",
  usersController.restoreSelectedUsers,
);
//#endregion user

//#region layanan
privateRouter.get("/layanan", layananController.getAll);
privateRouter.get("/layanan/:id", layananController.getById);
privateRouter.post("/layanan", layananController.create);
privateRouter.put("/layanan/:id", layananController.update);
privateRouter.delete("/layanan/:id", layananController.delete);
//#endregion layanan

//#region Genre
privateRouter.post("/genres", genreController.createGenre);
privateRouter.put("/genres/:id", genreController.updateGenre);
privateRouter.delete("/genres/:id", genreController.deleteGenre);
//#endregion Genre

//#region Category
privateRouter.post("/categories", categoryController.createCategory);
privateRouter.put("/categories/:id", categoryController.updateCategory);
privateRouter.delete("/categories/:id", categoryController.deleteCategory);
//#endregion Category

//#region langganan
privateRouter.get("/langganan", langgananController.getAll);
privateRouter.get("/langganan/:id", langgananController.getById);
privateRouter.post("/langganan", langgananController.create);
privateRouter.put("/langganan/:id", langgananController.update);
privateRouter.delete("/langganan/multiple-delete", langgananController.deletes);
privateRouter.delete("/langganan/:id", langgananController.delete);
//#endregion langganan

privateRouter.get("/profilperusahaan", profilPerusahaanController.getAll);
privateRouter.get("/profilperusahaan/:id", profilPerusahaanController.getById);
privateRouter.post("/profilperushaan", profilPerusahaanController.create);
privateRouter.put("/profilperusahaan/:id", profilPerusahaanController.update);
privateRouter.delete(
  "/profilperusahaan/:id",
  profilPerusahaanController.delete,
);

export default privateRouter;

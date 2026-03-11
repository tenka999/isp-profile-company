import multer from "multer";
import path from "path";

// === Storage Cover (gambar) ===
const coverStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cover-book/"); // folder untuk cover
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/gallery/"); // folder untuk cover
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const articleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/article/"); // folder untuk cover
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// === Storage PDF ===
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pdf-book/"); // folder untuk pdf
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// === Storage Profile Picture ===
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-pic/"); // folder untuk profile pics
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // gambar oke
  } else if (ext === ".pdf") {
    cb(null, true); // pdf oke
  } else {
    cb(new Error("Only images and PDF are allowed"), false);
  }
}

// Export uploader berbeda
export const coverBook = multer({ storage: coverStorage, fileFilter });
export const uploadPdf = multer({ storage: pdfStorage, fileFilter });
export const uploadProfile = multer({ storage: profileStorage, fileFilter });
export const uploadGallery = multer({ storage: galleryStorage, fileFilter });
export const uploadArticle = multer({ storage: articleStorage, fileFilter });

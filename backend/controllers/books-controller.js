import { parseQuery } from "prisma-query-tools";
import { getAllBooks,getAllBooksByDeleted, getAllBooksByUpdated, getAllBooksExist, getBookById,createBook,deleteBookById,updateBookById } from "../services/books-service.js";
import { responseFormat } from "../utils/helper.js";

async function getAll(req, res) {

  console.log(req.query);
  const queryPrisma = parseQuery(req.query);
  console.log(queryPrisma)
  try {
    const books = await getAllBooks(queryPrisma.data);
      res
        .status(200)
        .json(responseFormat("success", books, "Book fetched  "));

    // res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllDeleted(req, res) {
  try {
    const books = await getAllBooksByDeleted();
      res
        .status(200)
        .json(responseFormat("success", books, "Book fetched"));

    // res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllUpdated(req, res) {
  try {
    const books = await getAllBooksByUpdated();
      res
        .status(200)
        .json(responseFormat("success", books, "Book fetched"));

    // res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllExist(req, res) {
  console.log('getAllExist');
  try {
    const books = await getAllBooksExist();
      res
        .status(200)
        .json(responseFormat("success", books, "Book fetched"));

    // res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getOne(req, res) {
  try {
    const book = await getBookById(parseInt(req.params.id));
      res
        .status(200)
        .json(responseFormat("success", book, "Book fetched"));

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function create(req, res) {
  console.log(req.body);
  console.log(req.files);
  try {
    const data = req.body;
    if (req.files?.cover) {
      data.cover = req.files.cover[0].filename;
    }
     if (req.files?.pdf) {
       data.pdf_url = req.files.pdf[0].filename;
     }

    const newBook = await createBook(req.body);
      res
        .status(201)
        .json(responseFormat("success", newBook, "Book created"));

    // res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const book = await deleteBookById(parseInt(req.params.id), req.user.id);
      res
        .status(200)
        .json(responseFormat("success", book, "Book deleted"));

    // res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function updateOne(req, res) {
  try {
    const data = req.body;
     if (req.files?.cover) {
       data.cover = req.files.cover[0].filename;
     }
     if (req.files?.pdf) {
       data.pdf_url = req.files.pdf[0].filename;
     }
    const book = await updateBookById(parseInt(req.params.id), req.body, req.user.id);
      res
        .status(200)
        .json(responseFormat("success", book, "Book updated"));

    // res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default { getAll, getOne, create, deleteOne, updateOne,getAllDeleted,getAllUpdated,getAllExist };
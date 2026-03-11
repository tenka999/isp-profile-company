// controllers/categoryController.js
import categoryService from "../services/category-service.js";
import { responseFormat } from "../utils/helper.js";

 const categoryController = {
  // GET /categories
  async getCategory(req, res) {
    try {
      const categories = await categoryService.getallCategory();
      res
        .status(200)
        .json(responseFormat("success", categories, "All categories fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /categories/:id
  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(parseInt(req.params.id));
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res
        .status(200)
        .json(responseFormat("success", category, "Category fetched by id"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /categories
  async createCategory(req, res) {
    try {
      const category = await categoryService.createCategory(req.body, req.user?.id);
      res
        .status(201)
        .json(responseFormat("success", category, "Category created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /categories/:id
  async updateCategory(req, res) {
    try {
      const category = await categoryService.updateCategory(
        parseInt(req.params.id),
        req.body,
        req.user?.id
      );
      res
        .status(200)
        .json(responseFormat("success", category, "Category updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /categories/:id
  async deleteCategory(req, res) {
    console.log("Deleting category with id:", req.params.id);
    try {
      const category = await categoryService.deleteCategory(
        parseInt(req.params.id),
        req.user?.id
      );
      res
        .status(200)
        .json(responseFormat("success", category, "Category deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default categoryController;
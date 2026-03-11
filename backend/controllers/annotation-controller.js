import annotationService from "../services/annotation-service.js";
import { responseFormat } from "../utils/helper.js";
async function getallAnnotation(req, res) {
  try {
    const annotation = await annotationService.getallAnnotation();
    res
      .status(200)
      .json(responseFormat("success", annotation, "Annotation updated"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnnotationById(req, res) {
  try {
    const annotation = await annotationService.getAnnotationById(
      parseInt(req.params.id)
    );
      res
        .status(200)
        .json(responseFormat("success", annotation, "Annotation updated"));
    // res.status(201).json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnnotationByBookId(req, res) {
  try {
    const annotation = await annotationService.getAnnotationByBookId(
      parseInt(req.params.bookId)
    );
      res
        .status(200)
        .json(responseFormat("success", annotation, "Annotation updated"));

    // res.status(201).json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createAnnotation(req, res) {
  try {
    const annotation = await annotationService.createAnnotation(req.body);
    // res.status(201).json(annotation);
      res
        .status(201)
        .json(responseFormat("success", annotation, "Annotation created"));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAnnotation(req, res) {
  try {
    const annotation = await annotationService.updateAnnotation(
      parseInt(req.params.id),
      req.body
    );
      res
        .status(200)
        .json(responseFormat("success", annotation, "Annotation updated"));

    // res.status(201).json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteAnnotation(req, res) {
  try {
    const annotation = await annotationService.deleteAnnotationById(
      parseInt(req.params.id)
    );
      res
        .status(200)
        .json(responseFormat("success", annotation, "Annotation updated"));

    // res.status(201).json(annotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getallAnnotation,
  getAnnotationById,
  getAnnotationByBookId,
  createAnnotation,
  updateAnnotation,
  deleteAnnotation,
};

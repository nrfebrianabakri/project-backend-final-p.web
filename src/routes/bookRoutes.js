import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", authenticate, authorize("ADMIN"), createBook);
router.put("/:id", authenticate, authorize("ADMIN"), updateBook);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteBook);

export default router;

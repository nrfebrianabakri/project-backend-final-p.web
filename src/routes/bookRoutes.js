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
import { validateBody } from "../middleware/validateMiddleware.js";
import { createBookSchema, updateBookSchema } from "../validators/bookValidator.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateBody(createBookSchema),
  createBook
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateBody(updateBookSchema),
  updateBook
);


router.delete("/:id", authenticate, authorize("ADMIN"), deleteBook);

export default router;

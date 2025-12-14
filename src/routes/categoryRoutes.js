import express from "express";
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from "../controllers/categoryController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authenticate, authorize("ADMIN"), createCategory);
router.put("/:id", authenticate, authorize("ADMIN"), updateCategory);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteCategory);

export default router;

import express from "express";
import { 
  getLoans, 
  getLoanById, 
  createLoan, 
  updateLoan, 
  deleteLoan 
} from "../controllers/loanController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN"), getLoans);
router.get("/:id", authenticate, getLoanById); // Owner or Admin check bisa di middleware
router.post("/", authenticate, createLoan);
router.put("/:id", authenticate, updateLoan);
router.delete("/:id", authenticate, deleteLoan);

export default router;

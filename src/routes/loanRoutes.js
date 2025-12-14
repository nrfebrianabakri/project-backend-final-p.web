import express from "express";
import { 
  getLoans, 
  getLoanById, 
  createLoan, 
  updateLoan, 
  deleteLoan,
} from "../controllers/loanController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADMIN
router.get("/", authenticate, authorize("ADMIN"), getLoans);
router.put("/:id", authenticate, authorize("ADMIN"), updateLoan);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteLoan);

// USER
router.post("/", authenticate, authorize("USER"), createLoan);

// ADMIN & USER (dengan validasi kepemilikan di controller)
router.get("/:id", authenticate, getLoanById);
export default router;

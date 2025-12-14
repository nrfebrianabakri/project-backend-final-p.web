import express from "express";
import { 
  getLoans, 
  getLoanById, 
  createLoan, 
  updateLoan, 
  deleteLoan,
  getMyLoans
} from "../controllers/loanController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// USER
router.post("/", authenticate, authorize("USER"), createLoan);
router.get("/me", authenticate, authorize("USER"), getMyLoans);

// ADMIN
router.get("/", authenticate, authorize("ADMIN"), getLoans);
router.put("/:id", authenticate, authorize("ADMIN"), updateLoan);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteLoan);
router.get("/:id", authenticate, authorize("ADMIN"), getLoanById);

export default router;

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
import { validateBody } from "../middleware/validateMiddleware.js";
import { createLoanSchema } from "../validators/loanValidator.js";

const router = express.Router();

// USER
router.post(
  "/",
  authenticate,
  authorize("USER"),
  validateBody(createLoanSchema),
  createLoan
);

router.get("/me", authenticate, authorize("USER"), getMyLoans);

// ADMIN
router.get("/", authenticate, authorize("ADMIN"), getLoans);
router.get("/:id", authenticate, authorize("ADMIN"), getLoanById);
router.put("/:id", authenticate, authorize("ADMIN"), updateLoan);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteLoan);

export default router;

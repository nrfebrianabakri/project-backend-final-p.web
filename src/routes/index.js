import express from "express";
import bookRoutes from "./bookRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import loanRoutes from "./loanRoutes.js";
import healthRoutes from "./healthRoutes.js"; 
import authRoutes from "./authRoutes.js"; 


const router = express.Router();

router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/loans", loanRoutes);
router.use("/", healthRoutes); 
router.use("/auth", authRoutes);

export default router;

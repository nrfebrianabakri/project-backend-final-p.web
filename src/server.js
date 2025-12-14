import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", routes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

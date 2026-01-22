import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import scanRoutes from "./routes/scan.routes.js";
import historyRoutes from "./routes/history.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/history", historyRoutes);

app.use(errorHandler);

export default app;

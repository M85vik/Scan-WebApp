import express from "express";
import upload from "../config/multer.js";
import auth from "../middlewares/auth.middleware.js";
import { scanImages, getScanStatus } from "../controllers/scan.controller.js";

const router = express.Router();

router.post(
  "/",
  auth,
  upload.array("images", 5),
  scanImages
);

router.get("/:id/status", auth, getScanStatus);

export default router;

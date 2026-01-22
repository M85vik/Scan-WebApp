import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  getAllScans,
  getScanById
} from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", auth, getAllScans);
router.get("/:id", auth, getScanById);

export default router;

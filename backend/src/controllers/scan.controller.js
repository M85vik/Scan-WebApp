import Scan from "../models/scan.model.js";
import { runScanner } from "../services/python.service.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";
import { deleteFile } from "../utils/cleanup.util.js";
import path from "path";



export const scanImages = async (req, res, next) => {
  let scan;

  try {
    // 1️⃣ Create scan record immediately
    scan = await Scan.create({
      userId: req.user.id,
      images: [],
      status: "PROCESSING",
      progress: 0
    });

    const total = req.files.length;

    for (let i = 0; i < total; i++) {
      const file = req.files[i];

      const inputPath = file.path;
      const processedPath = path.join(
        "uploads/processed",
        `processed-${Date.now()}-${file.filename}`
      );

      // OpenCV
      const scanResult = await runScanner(inputPath, processedPath);

      // Uploads
      const originalUpload = await uploadToCloudinary(inputPath, "scans/original");
      const processedUpload = await uploadToCloudinary(processedPath, "scans/processed");

      // Cleanup
      deleteFile(inputPath);
      deleteFile(processedPath);

      // Save image result
      scan.images.push({
        original: originalUpload.url,
        processed: processedUpload.url,
        type: scanResult.type,
        lowContrast: scanResult.low_contrast
      });

      // Update progress
      scan.progress = Math.round(((i + 1) / total) * 100);
      await scan.save();
    }

    scan.status = "COMPLETED";
    scan.progress = 100;
    await scan.save();

    res.status(201).json(scan);

  } catch (err) {
    if (scan) {
      scan.status = "FAILED";
      await scan.save();
    }
    next(err);
  }
};



export const getScanStatus = async (req, res, next) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.json({
      status: scan.status,
      progress: scan.progress
    });
  } catch (err) {
    next(err);
  }
};

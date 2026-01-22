import Scan from "../models/scan.model.js";

export const getAllScans = async (req, res, next) => {
  try {
    const scans = await Scan.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(scans);
  } catch (err) {
    next(err);
  }
};

export const getScanById = async (req, res, next) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.json(scan);
  } catch (err) {
    next(err);
  }
};

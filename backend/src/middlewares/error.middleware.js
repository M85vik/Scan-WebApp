export default (err, req, res, next) => {
  console.error(err);

  if (err.message.includes("Only image files")) {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File too large (max 5MB)" });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({ message: "Max 5 images allowed" });
  }

  res.status(500).json({
    message: err.message || "Server error"
  });
};

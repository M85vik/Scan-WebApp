import fs from "fs";

export const deleteFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

import { spawn } from "child_process";
import path from "path";

export const runScanner = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", [
      path.resolve("src/python/scanner.py"),
      inputPath,
      outputPath,
    ]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0 || stderr) {
        return reject(new Error(stderr || "Python process failed"));
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        reject(new Error("Invalid JSON from Python"));
      }
    });
  });
};

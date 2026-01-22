import { useState } from "react";
import Navbar from "../components/Navbar";
import { scanImages } from "../api/scan";
import ScanResult from "../components/ScanResult";
import { Upload, ScanLine, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    setError("");
    setFiles(selected);
    setResult(null);
  };

  const startScan = async () => {
    if (files.length === 0) return;

    try {
      setLoading(true);
      setError("");
      const res = await scanImages(files);
      setResult(res);
    } catch (err) {
      setError(err?.message || "Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />



      <main className="max-w-3xl md:max-w-5xl mx-auto p-4 my-24 ">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-1">
          Scan Documents
        </h1>
        <p className="text-sm text-white mb-6">
          Upload images and convert them into clean scanned documents
        </p>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          {/* File Picker */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-primary transition">
            <Upload className="text-primary mb-2" />
            <p className="text-sm font-medium text-gray-700">
              Click to upload images
            </p>
            <p className="text-xs text-gray-500 mt-1">
             up to 4 images • JPG / PNG
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleSelect}
              className="hidden"
            />
          </label>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          {/* Preview Thumbnails */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg border overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Scan Button */}
          {files.length > 0 && (
            <button
              onClick={startScan}
              disabled={loading}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-primary hover:bg-black text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Scanning...
                </>
              ) : (
                <>
                  <ScanLine size={16} />
                  Scan Now
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 animate-pulse">
              Processing images, please wait…
            </p>
          </div>
        )}

        {/* Scan Results */}
        {result && result.images && (
          <ScanResult images={result.images} />
        )}
      </main>
    </>
  );
}

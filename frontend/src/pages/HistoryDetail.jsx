import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScanById } from "../api/history";
import Navbar from "../components/Navbar";
import ScanResult from "../components/ScanResult";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getScanById(id);
        setScan(data);
      } catch (err) {
        setError(err?.message || "Failed to load scan");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-4">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-primary hover:underline mb-3"
        >
          <ArrowLeft size={16} />
          Back to history
        </button>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={18} />
            Loading scan…
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}

        {/* Content */}
        {scan && (
          <>
            {/* Header Card */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Scan Details
              </h1>

              <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                <Calendar size={14} />
                {new Date(scan.createdAt).toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {scan.images.length} image(s) processed
              </p>
            </div>

            {/* Results */}
            <ScanResult images={scan.images} />
          </>
        )}
      </main>
    </>
  );
}

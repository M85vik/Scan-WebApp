import { useEffect, useState } from "react";
import { getHistory } from "../api/history";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Clock, Image } from "lucide-react";

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHistory();
        setScans(data);
      } catch (err) {
        setError(err?.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-1">
          Scan History
        </h1>
        <p className="text-sm text-white mb-6">
          View and manage your previous scans
        </p>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-sm text-white animate-pulse">
              Loading scans…
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && scans.length === 0 && (
          <div className="bg-white border rounded-2xl p-6 text-center">
            <p className="text-white">
              No scans yet. Start scanning your documents!
            </p>
          </div>
        )}

        {/* History List */}
        <div className="space-y-4">
          {scans.map((scan) => (
            <div
              key={scan._id}
              onClick={() => navigate(`/history/${scan._id}`)}
              className="bg-white border rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Image size={16} />
                    {scan.images.length} image(s)
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} />
                    {new Date(scan.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="text-sm text-primary font-medium">
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

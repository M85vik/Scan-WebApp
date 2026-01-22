import BeforeAfterSlider from "./BeforeAfterSlider";
import { Download, Image as ImageIcon } from "lucide-react";

export default function ScanResult({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-sm border p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-800">
              Result {idx + 1}
              <span className="ml-2 text-xs text-gray-500 uppercase">
                {img.type}
              </span>
            </p>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Before
              </p>
              <img
                src={img.original}
                alt="Before scan"
                loading="lazy"
                className="w-full rounded-lg border bg-gray-50 object-contain hover:scale-[1.01] transition"
              />
            </div>

            {/* After */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                After
              </p>
              <img
                src={img.processed}
                alt="After scan"
                loading="lazy"
                className="w-full rounded-lg border bg-gray-50 object-contain hover:scale-[1.01] transition"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <a
              href={img.processed}
              download
              className="flex items-center justify-center gap-2 flex-1 bg-primary hover:bg-black text-white py-2 rounded-lg text-sm font-medium transition"
            >
              <Download size={16} />
              Download
            </a>
          </div>

          {/* Optional Slider (comment/uncomment) */}
          {/*
          <div className="mt-5">
            <BeforeAfterSlider
              before={img.original}
              after={img.processed}
            />
          </div>
          */}
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";

export default function BeforeAfterSlider({ before, after }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full overflow-hidden rounded">
      <img src={after} className="w-full" />
      <img
        src={before}
        className="absolute top-0 left-0 h-full"
        style={{ width: `${pos}%` }}
      />

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(e.target.value)}
        className="absolute bottom-2 w-full"
      />
    </div>
  );
}

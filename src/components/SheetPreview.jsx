import { useMemo, useRef, useState, useEffect } from "react";
import { buildSvg } from "../utils/drawing.svg";
import { SHEET_SIZES } from "../constants";

export default function SheetPreview({ sheetType, areaW, areaH, error, zoom }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 800 });

  const svg = useMemo(
    () => buildSvg(sheetType, areaW, areaH),
    [sheetType, areaW, areaH],
  );

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (zoom > 1) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [zoom]);

  const [sheetW, sheetH] = SHEET_SIZES[sheetType];
  const aspectRatio = sheetW / sheetH;
  const baseWidth = Math.min(size.width * 0.9, size.height * 0.9 * aspectRatio);
  const finalWidth = baseWidth * zoom;

  const isZoomed = zoom > 1;

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto"
      style={{
        display: "flex",
        alignItems: isZoomed ? "flex-start" : "center",
        justifyContent: isZoomed ? "flex-start" : "center",
      }}
    >
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div
          id="sheet-preview"
          className="border border-gray-200 bg-white"
          style={{
            width: `${finalWidth}px`,
            flexShrink: 0,
            margin: isZoomed ? "2rem auto" : "0",
            minWidth: isZoomed ? `${finalWidth}px` : "unset",
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}

export default function ZoomControls({ zoom, onZoom, onReset }) {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
      <button
        onClick={() => onZoom(Math.max(0.25, zoom - 0.25))}
        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-lg leading-none"
      >
        −
      </button>
      <span className="text-xs text-gray-500 w-10 text-center">
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={() => onZoom(Math.min(4, zoom + 0.25))}
        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded text-lg leading-none"
      >
        +
      </button>
      <div className="w-px h-4 bg-gray-200 mx-1" />
      <button
        onClick={onReset}
        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
      >
        <i
          className="ti ti-maximize"
          style={{ fontSize: "16px" }}
          aria-label="reset zoom"
        />
      </button>
    </div>
  );
}

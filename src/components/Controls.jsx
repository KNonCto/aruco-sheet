import { SHEET_SIZES } from "../constants";

function Slider({ label, id, min, max, step, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label htmlFor={id} className="text-sm text-gray-500">
          {label}
        </label>
        <span className="text-sm font-medium text-gray-800">
          {value.toFixed(1)} cm
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-gray-500"
      />
    </div>
  );
}

export default function Controls({ state, onChange }) {
  const [sheetW, sheetH] = SHEET_SIZES[state.sheetType];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minWidth: "220px",
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="sheetType" className="text-sm text-gray-500">
          Tipo de hoja
        </label>
        <select
          id="sheetType"
          value={state.sheetType}
          onChange={(e) => onChange({ sheetType: e.target.value })}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {Object.entries(SHEET_SIZES).map(([name, [w, h]]) => (
            <option key={name} value={name}>
              {name} ({w} × {h} cm)
            </option>
          ))}
        </select>
      </div>

      <Slider
        label="Ancho del área"
        id="areaW"
        min={2}
        max={sheetW - 1}
        step={0.1}
        value={state.areaW}
        onChange={(v) => onChange({ areaW: v })}
      />

      <Slider
        label="Alto del área"
        id="areaH"
        min={2}
        max={sheetH - 1}
        step={0.1}
        value={state.areaH}
        onChange={(v) => onChange({ areaH: v })}
      />
    </div>
  );
}

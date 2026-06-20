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

const LINE_STYLE_OPTIONS = [
  { value: "solid", label: "───" },
  { value: "dashed", label: "─ ─ ─" },
  { value: "dotted", label: "· · · ·" },
];

function LineStyleToggle({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">Estilo de línea</label>
      <div className="flex gap-1 bg-gray-100 rounded-md p-1">
        {LINE_STYLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${
              value === opt.value
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const LINE_COLOR_OPTIONS = [
  { value: "#000000", label: "Negro" },
  { value: "#ff2108", label: "Rojo" },
  { value: "#930484", label: "Morado" },
  { value: "#0146fb", label: "Azul" },
  { value: "#00aa23", label: "Verde" },
  { value: "#fdfe01", label: "Amarillo" },
  { value: "#ff8000", label: "Naranja" },

  { value: "#cccccc", label: "Gris" },
  { value: "#ffd3ce", label: "Rojo Claro" },
  { value: "#eacce6", label: "Morado Claro" },
  { value: "#ccdafe", label: "Azul Claro" },
  { value: "#cceed3", label: "Verde Claro" },
  { value: "#ffffcc", label: "Amarillo Claro" },
  { value: "#ffe6cc", label: "Naranja Claro" },
];

function LineColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-500">Color de línea</label>
      <div className="grid grid-cols-7 gap-2">
        {LINE_COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            title={opt.label}
            className={`aspect-square rounded-md border-2 transition-all ${
              value === opt.value
                ? "border-gray-800 scale-110"
                : "border-gray-200 hover:border-gray-400"
            }`}
            style={{ backgroundColor: opt.value }}
          />
        ))}
      </div>
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

      <LineStyleToggle
        value={state.lineStyle}
        onChange={(v) => onChange({ lineStyle: v })}
      />

      <LineColorPicker
        value={state.lineColor}
        onChange={(v) => onChange({ lineColor: v })}
      />

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

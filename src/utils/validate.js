import { SHEET_SIZES, MARKER_RATIO, MIN_GAP_CM } from "../constants";

export function validate(sheetType, areaW, areaH) {
  const [sheetW, sheetH] = SHEET_SIZES[sheetType];
  const markerSize = Math.min(areaW, areaH) * MARKER_RATIO;
  const marginW = (sheetW - areaW) / 2;
  const marginH = (sheetH - areaH) / 2;

  if (marginW < 0 || marginH < 0) return `El área excede la hoja ${sheetType}.`;
  if (marginW - markerSize < MIN_GAP_CM)
    return `Ancho demasiado grande para ${sheetType}. Máximo ≈ ${(sheetW - 2 * (markerSize + MIN_GAP_CM)).toFixed(1)} cm.`;
  if (marginH - markerSize < MIN_GAP_CM)
    return `Alto demasiado grande para ${sheetType}. Máximo ≈ ${(sheetH - 2 * (markerSize + MIN_GAP_CM)).toFixed(1)} cm.`;

  return null;
}

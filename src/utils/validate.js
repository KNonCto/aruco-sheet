import {
  SHEET_SIZES,
  MARKER_RATIO,
  MIN_GAP_CM,
  PAGE_SAFE_MARGIN_CM,
} from "../constants";

export function validate(sheetType, areaW, areaH) {
  const [sheetW, sheetH] = SHEET_SIZES[sheetType];
  const markerSize = Math.min(areaW, areaH) * MARKER_RATIO;
  const marginW = (sheetW - areaW) / 2;
  const marginH = (sheetH - areaH) / 2;

  if (marginW < 0 || marginH < 0) return `El área excede la hoja ${sheetType}.`;

  const requiredGap = MIN_GAP_CM + PAGE_SAFE_MARGIN_CM;

  if (marginW - markerSize < requiredGap)
    return `Ancho demasiado grande para ${sheetType}. Máximo ≈ ${(sheetW - 2 * (markerSize + requiredGap)).toFixed(1)} cm.`;
  if (marginH - markerSize < requiredGap)
    return `Alto demasiado grande para ${sheetType}. Máximo ≈ ${(sheetH - 2 * (markerSize + requiredGap)).toFixed(1)} cm.`;

  return null;
}

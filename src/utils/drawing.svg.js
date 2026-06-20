import { SHEET_SIZES, MARKER_RATIO, PAGE_SAFE_MARGIN_CM } from "../constants";
import { markerToSvg } from "./aruco.svg";

const LINE_DASH_PATTERNS = {
  solid: null,
  dashed: "0.3,0.15",
  dotted: "0.05,0.1",
};

export function buildSvg(
  sheetType,
  areaW,
  areaH,
  lineStyle = "solid",
  lineColor = "#000000",
) {
  const [sheetW, sheetH] = SHEET_SIZES[sheetType];
  const markerSize = Math.min(areaW, areaH) * MARKER_RATIO;

  const offX = (sheetW - areaW) / 2;
  const offY = (sheetH - areaH) / 2;
  const m = markerSize;

  const strokeWidth = 0.05;
  const strokeOffset = strokeWidth / 2;

  const cornerGap = m * 0.5; // 50% del tamaño del marcador

  const x1 = offX - strokeOffset;
  const y1 = offY - strokeOffset;
  const x2 = offX + areaW + strokeOffset;
  const y2 = offY + areaH + strokeOffset;

  const dashPattern = LINE_DASH_PATTERNS[lineStyle];
  const dashAttr = dashPattern ? `stroke-dasharray="${dashPattern}"` : "";

  const corners = [
    [0, offX - m, offY - m],
    [1, offX + areaW, offY - m],
    [2, offX + areaW, offY + areaH],
    [3, offX - m, offY + areaH],
  ];

  const markers = corners
    .map(([id, x, y]) => {
      const cx = Math.max(0, Math.min(x, sheetW - m));
      const cy = Math.max(0, Math.min(y, sheetH - m));
      return markerToSvg(id, cx, cy, m);
    })
    .join("\n");

  const fontSize = 0.28;
  const fontSizeSmall = 0.22;

  return `
    <svg
      viewBox="0 0 ${sheetW} ${sheetH}"
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
      style="width: 100%; height: 100%;"
    >
      <rect x="0" y="0" width="${sheetW}" height="${sheetH}" fill="white"/>

      <!-- línea superior -->
      <line x1="${x1 + cornerGap}" y1="${y1}" x2="${x2 - cornerGap}" y2="${y1}" stroke="${lineColor}" stroke-width="${strokeWidth}" ${dashAttr}/>
      
      <!-- línea inferior -->
      <line x1="${x1 + cornerGap}" y1="${y2}" x2="${x2 - cornerGap}" y2="${y2}" stroke="${lineColor}" stroke-width="${strokeWidth}" ${dashAttr}/>
      
      <!-- línea izquierda -->
      <line x1="${x1}" y1="${y1 + cornerGap}" x2="${x1}" y2="${y2 - cornerGap}" stroke="${lineColor}" stroke-width="${strokeWidth}" ${dashAttr}/>
      
      <!-- línea derecha -->
      <line x1="${x2}" y1="${y1 + cornerGap}" x2="${x2}" y2="${y2 - cornerGap}" stroke="${lineColor}" stroke-width="${strokeWidth}" ${dashAttr}/>

      ${markers}

      <text
        x="${offX + areaW / 2}" y="${offY - m / 3}"
        font-size="${fontSize}" font-family="sans-serif"
        text-anchor="middle" dominant-baseline="middle"
        fill="black"
      >${areaW.toFixed(1)} cm</text>

      <text
        x="${offX + areaW + m / 3}" y="${offY + areaH / 2}"
        font-size="${fontSize}" font-family="sans-serif"
        text-anchor="middle" dominant-baseline="middle"
        fill="black"
        transform="rotate(90, ${offX + areaW + m / 3}, ${offY + areaH / 2})"
      >${areaH.toFixed(1)} cm</text>

      <text
        x="${PAGE_SAFE_MARGIN_CM}" y="${sheetH - PAGE_SAFE_MARGIN_CM}"
        font-size="${fontSizeSmall}" font-family="sans-serif"
        text-anchor="start" dominant-baseline="auto"
        fill="#555"
      >Hoja: ${sheetType}  |  Área: ${areaW.toFixed(1)} × ${areaH.toFixed(1)} cm</text>
    </svg>
  `;
}

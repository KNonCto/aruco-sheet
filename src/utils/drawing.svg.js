import { SHEET_SIZES, MARKER_RATIO } from "../constants";
import { markerToSvg } from "./aruco.svg";

export function buildSvg(sheetType, areaW, areaH) {
  const [sheetW, sheetH] = SHEET_SIZES[sheetType];
  const markerSize = Math.min(areaW, areaH) * MARKER_RATIO;

  const offX = (sheetW - areaW) / 2;
  const offY = (sheetH - areaH) / 2;
  const m = markerSize;

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

      <rect
        x="${offX}" y="${offY}"
        width="${areaW}" height="${areaH}"
        fill="none" stroke="black" stroke-width="0.05"
      />

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
        x="0.2" y="${sheetH - 0.15}"
        font-size="${fontSizeSmall}" font-family="sans-serif"
        text-anchor="start" dominant-baseline="auto"
        fill="#555"
      >Hoja: ${sheetType}  |  Área: ${areaW.toFixed(1)} × ${areaH.toFixed(1)} cm</text>
    </svg>
  `;
}

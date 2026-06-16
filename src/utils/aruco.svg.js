const ARUCO_4X4_50 = [
  [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 1],
  ],
  [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
  ],
];

export function markerToSvg(id, x, y, size) {
  const bits = ARUCO_4X4_50[id];
  const total = 6; // 4 bits + 1 borde cada lado
  const cell = size / total;
  const rects = [];

  // Fondo negro
  rects.push(
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="black"/>`,
  );

  // Interior blanco
  rects.push(
    `<rect x="${x + cell}" y="${y + cell}" width="${size - 2 * cell}" height="${size - 2 * cell}" fill="white"/>`,
  );

  // Bits
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (bits[r][c] === 1) {
        rects.push(
          `<rect x="${x + (1 + c) * cell}" y="${y + (1 + r) * cell}" width="${cell}" height="${cell}" fill="black"/>`,
        );
      }
    }
  }

  return rects.join("\n");
}

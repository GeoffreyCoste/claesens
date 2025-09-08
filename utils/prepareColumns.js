export function prepareColumns(images, columns, imagesPerColumn) {
  // Mélange les images
  const shuffled = [...images].sort(() => Math.random() - 0.5);

  // Séparer par couleur (si tu as ajouté la propriété bg)
  let gray = shuffled.filter(img => img.bg === 'gray');
  let black = shuffled.filter(img => img.bg === 'black');

  const cols = [];
  const firstColumnStartsGray = Math.random() < 0.5; // 🎲 premier départ aléatoire

  for (let colIndex = 0; colIndex < columns; colIndex++) {
    const col = [];
    const startWithGray = colIndex % 2 === 0 ? firstColumnStartsGray : !firstColumnStartsGray;

    for (let i = 0; i < imagesPerColumn; i++) {
      const useGray = (i % 2 === 0) === startWithGray;
      let img;

      if (useGray && gray.length) {
        img = gray.shift();
      } else if (!useGray && black.length) {
        img = black.shift();
      } else {
        // fallback : si une couleur manque, on prend ce qui reste
        img = (gray.length ? gray : black).shift();
      }

      if (img) col.push(img);
    }

    cols.push(col);
  }

  return cols;
}

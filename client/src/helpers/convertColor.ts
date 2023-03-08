function ToHex(r: number, g: number, b: number) {
  const hex = {
    r: (() => {
      const hex = r.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    })(),
    g: (() => {
      const hex = g.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    })(),
    b: (() => {
      const hex = b.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    })(),
  };

  return "#" + r + g + b;
}

function toRGB(hexColor: String) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return { r, g, b };
}

export default { ToHex, toRGB };

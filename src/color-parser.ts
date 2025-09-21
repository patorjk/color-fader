export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const namedColors: { [key: string]: string } = {
  'transparent': '#00000000',
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkgrey": "#a9a9a9",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkslategrey": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dimgrey": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "grey": "#808080",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavender": "#e6e6fa",
  "lavenderblush": "#fff0f5",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightgrey": "#d3d3d3",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightslategrey": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "rebeccapurple": "#663399",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "slategrey": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
};

/**
 * Converts a color string into an RGBAColor object
 *
 * @param color CSS color string
 */
export function cssColorToRgba(color: string): RgbaColor {
  const normalizedColor = color.trim().toLowerCase();

  if (normalizedColor.startsWith('#')) {
    return parseHexColor(normalizedColor);
  } else if (normalizedColor.startsWith('rgb')) {
    return parseRgbColor(normalizedColor);
  } else if (normalizedColor.startsWith('hsl')) {
    return parseHslColor(normalizedColor);
  } else if (namedColors[normalizedColor]) {
    return parseNamedColor(normalizedColor)!;
  }

  throw new Error(`Unsupported color format: ${color}`);
}

function parseHexColor(hex: string): RgbaColor {
  const cleanHex = hex.slice(1); // Remove the # symbol

  if (cleanHex.length < 3) throw new Error(`Invalid hex color format: ${hex}`);

  let r: number, g: number, b: number, a: number = 1;

  if (cleanHex.length <= 4) {
    if (typeof cleanHex[0] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
    if (typeof cleanHex[1] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
    if (typeof cleanHex[2] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);

    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    if (cleanHex.length === 4) {
      if (typeof cleanHex[3] !== 'string') throw new Error(`Invalid hex color format: ${hex}`);
      a = parseInt(cleanHex[3] + cleanHex[3], 16) / 255;
    }
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else if (cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
    a = parseInt(cleanHex.slice(6, 8), 16) / 255;
  } else {
    throw new Error(`Invalid hex color format: ${hex}`);
  }

  return {r, g, b, a};
}

function parseRgbColor(rgb: string): RgbaColor {
  // Extract the content inside parentheses
  const match = rgb.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }
  if (typeof match[1] !== 'string') throw new Error('Invalid RGB color format: ' + rgb);

  const values = match[1].trim().split(/[ ,/]+/).map(v => v.trim());

  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }

  if (typeof values[0] !== 'string' || typeof values[1] !== 'string' || typeof values[2] !== 'string') {
    throw new Error(`Invalid RGB color format: ${rgb}`);
  }

  const r = parseColorValue(values[0], 255);
  const g = parseColorValue(values[1], 255);
  const b = parseColorValue(values[2], 255);
  let a = 1;
  if (values.length === 4 && typeof values[3] === 'string') {
    a = parseAlphaValue(values[3], 1);
  }

  return {r, g, b, a};
}

function parseHslColor(hsl: string): RgbaColor {
  // Extract the content inside parentheses
  const match = hsl.match(/hsla?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }

  if (typeof match[1] !== 'string') throw new Error('Invalid RGB color format: ' + hsl);

  const values = match[1].trim().split(/[ ,/]+/).map(v => v.trim());

  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }
  if (typeof values[0] !== 'string' || typeof values[1] !== 'string' || typeof values[2] !== 'string') {
    throw new Error(`Invalid HSL color format: ${hsl}`);
  }

  const h = parseFloat(values[0]) / 360; // Convert to 0-1 range
  const s = parseFloat(values[1].replace('%', '')) / 100; // Convert percentage to 0-1
  const l = parseFloat(values[2].replace('%', '')) / 100; // Convert percentage to 0-1
  let a = 1;
  if (values.length === 4 && typeof values[3] === 'string') {
    a = parseAlphaValue(values[3], 1);
  }

  const {r, g, b} = hslToRgb(h, s, l);

  return {r, g, b, a};
}

function parseColorValue(value: string, maxValue: number): number {
  if (value.includes('%')) {
    return Math.round((parseFloat(value.replace('%', '')) / 100) * maxValue);
  }
  return Math.min(maxValue, Math.max(0, Math.round(parseFloat(value))));
}

function parseAlphaValue(value: string, maxValue: number): number {
  if (value.includes('%')) {
    return (parseFloat(value.replace('%', '')) / 100) * maxValue;
  }
  return Math.min(maxValue, Math.max(0, parseFloat(value)));
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function parseNamedColor(colorName: string): RgbaColor | null {
  if (namedColors[colorName]) {
    return parseHexColor(namedColors[colorName]);
  }

  return null;
}


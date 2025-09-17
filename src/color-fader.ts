/*
    Module to encapsulate fading
    By Patrick Gillespie (patorjk)
    Originally made for http://patorjk.com/text-color-fader
*/

export interface sRGBColor {
  r: number,
  g: number,
  b: number
}

export type Colors = sRGBColor[] | string[];

export interface FadeOptions {
  returnType?: string,
  numSign?: boolean
}

const hexToDec = (hex: string) => parseInt(hex, 16);

const decToHex = (dec: number) => {
  let hex = Math.round(dec).toString(16);
  hex = (hex.length < 2) ? '0' + hex : hex;
  return hex;
};

const twoColorFade = function (color1: sRGBColor, color2: sRGBColor, numPoints: number) {
  let rIncr = (color2.r - color1.r) / (numPoints - 1),
    gIncr = (color2.g - color1.g) / (numPoints - 1),
    bIncr = (color2.b - color1.b) / (numPoints - 1),
    colors = [],
    r = color1.r,
    g = color1.g,
    b = color1.b,
    ii;

  for (ii = 0; ii < numPoints; ii++) {
    colors.push({r: Math.abs(Math.round(r)), b: Math.abs(Math.round(b)), g: Math.abs(Math.round(g))});
    r = r + rIncr;
    g = g + gIncr;
    b = b + bIncr;
  }

  return colors;
};

const multiColorFade = function (colors: sRGBColor[], numPoints: number) {
  const colorIncr = (numPoints - 1) / (colors.length - 1);
  let ii: number,
    startPos = 0,
    endPos = 1,
    retColors: sRGBColor[] = [],
    tmpColors: sRGBColor[],
    dist;

  for (ii = 0; ii < Math.min(colors.length - 1, numPoints); ii++) {
    endPos = Math.max(startPos + 2, endPos + colorIncr);
    dist = Math.round(endPos) - Math.round(startPos);

    const currentColor = colors[ii];
    const nextColor = colors[ii + 1];

    if (!currentColor || !nextColor) {
      break; // Safety check
    }

    tmpColors = twoColorFade(currentColor, nextColor, dist);
    retColors.pop(); // remove last color
    retColors = retColors.concat(tmpColors);

    startPos = Math.round(endPos) - 1;
  }
  return retColors;
};

/**
 * Creates an array representing values in a color gradient between a given number of colors
 *
 * @param colors List of colors
 * @param numPoints Number of output points in the color gradient
 * @param options Some additional options
 */
export const fadeColors = (colors: Colors, numPoints: number, options: FadeOptions = {}): Colors => {
  const processedColors: sRGBColor[] = [];

  // convert hex colors to objects r,g,b properties
  for (let ii = 0; ii < colors.length; ii++) {
    let color = colors[ii];
    if (typeof color === 'string') {
      if (color.slice(0, 1) === '#') {
        color = color.slice(1);
      }

      // if using 3 char string, convert to 6 char strings
      if (color.length === 3) {
        color = color.slice(0, 1) + color.slice(0, 1) + color.slice(1, 2) + color.slice(1, 2) + color.slice(2, 3) + color.slice(2, 3);
      }

      let r = hexToDec(color.substring(0, 2));
      let g = hexToDec(color.substring(2, 4));
      let b = hexToDec(color.substring(4, 6));
      processedColors.push({r: r, g: g, b: b});
    } else {
      if (color) {
        processedColors.push(color);
      }
    }
  }

  // fade
  const outputColors = multiColorFade(processedColors, numPoints);
  const hexOutputColors: string[] = [];


  // convert colors to hex if desired
  if (options.returnType === 'hex') {
    const numSign = !options.numSign ? '' : '#'; // default to true
    for (let ii = 0; ii < outputColors.length; ii++) {
      let color = outputColors[ii];
      if (color) {
        hexOutputColors.push(numSign + decToHex(color.r) + decToHex(color.g) + decToHex(color.b));
      }
    }
    return hexOutputColors;
  }

  return outputColors;
};



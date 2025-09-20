import {cssColorToRgba, type RGBAColor} from './color-parser';

export type {RGBAColor};
export type Color = RGBAColor | string;

/**
 * Creates an array representing values in a color gradient between a given number of colors
 *
 * @param colors List of colors
 * @param outputSize Number of output points in the color gradient
 */
export const fadeColors = (colors: Color[], outputSize: number): RGBAColor[] => {
  const processedColors: RGBAColor[] = colors.map(color => {
    return (typeof color === 'string') ? cssColorToRgba(color) : color;
  });

  if (processedColors.length === 0) {
    throw new Error('Colors array cannot be empty');
  }

  if (outputSize <= 0) {
    throw new Error('Output size must be greater than 0');
  }

  if (outputSize === 1) {
    if (processedColors[0]) {
      return [{r: processedColors[0].r, g: processedColors[0].g, b: processedColors[0].b, a: processedColors[0].a}];
    } else {
      throw new Error('Colors array cannot be empty');
    }
  }

  if (processedColors.length === 1) {
    const color = processedColors[0];
    if (typeof color !== 'undefined') {
      return Array(outputSize).fill(null).map(() => ({r: color.r, g: color.g, b: color.b, a: color.a}));
    } else {
      throw new Error('Colors array cannot be empty');
    }
  }

  const result: RGBAColor[] = [];

  // Calculate how many steps between each pair of colors
  const totalSegments = processedColors.length - 1;
  const stepsPerSegment = (outputSize - 1) / totalSegments;

  for (let i = 0; i < outputSize; i++) {
    // Find which segment we're in
    const segmentIndex = Math.min(
      Math.floor(i / stepsPerSegment),
      totalSegments - 1
    );

    // Find the position within the current segment (0 to 1)
    const segmentProgress = (i / stepsPerSegment) - segmentIndex;
    const t = Math.min(segmentProgress, 1);

    const startColor = processedColors[segmentIndex];
    const endColor = processedColors[segmentIndex + 1];

    if (startColor && endColor) {
      // Linear interpolation between the two colors
      const interpolatedColor: RGBAColor = {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * t),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * t),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * t),
        a: startColor.a + (endColor.a - startColor.a) * t
      };

      result.push(interpolatedColor);
    }
  }

  return result;
}

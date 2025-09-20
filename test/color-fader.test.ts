import {describe, it, expect} from 'vitest';
import {fadeColors, type RGBAColor, type Color} from '../src/color-fader';

describe('fadeColors', () => {
  describe('Basic functionality', () => {
    it('should create a gradient between two colors', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1}, // red
        {r: 0, g: 0, b: 255, a: 1}  // blue
      ];

      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1}); // red
      expect(result[1]).toEqual({r: 128, g: 0, b: 128, a: 1}); // middle (purple)
      expect(result[2]).toEqual({r: 0, g: 0, b: 255, a: 1}); // blue
    });

    it('should handle string colors', () => {
      const colors: Color[] = ['red', 'blue'];
      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[1]).toEqual({r: 128, g: 0, b: 128, a: 1}); // middle (purple)
      expect(result[2]).toEqual({r: 0, g: 0, b: 255, a: 1});
    });

    it('should handle mixed string and RGBAColor inputs', () => {
      const colors: Color[] = [
        'red',
        {r: 0, g: 255, b: 0, a: 1}, // green
        '#0000ff' // blue
      ];

      const result = fadeColors(colors, 5);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1}); // red
      expect(result[2]).toEqual({r: 0, g: 255, b: 0, a: 1}); // green
      expect(result[4]).toEqual({r: 0, g: 0, b: 255, a: 1}); // blue
    });
  });

  describe('Single color scenarios', () => {
    it('should return single color when outputSize is 1', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1},
        {r: 0, g: 255, b: 0, a: 1}
      ];

      const result = fadeColors(colors, 1);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
    });

    it('should repeat single color when only one color provided', () => {
      const colors: Color[] = [{r: 255, g: 0, b: 0, a: 1}];
      const result = fadeColors(colors, 5);

      expect(result).toHaveLength(5);
      result.forEach(color => {
        expect(color).toEqual({r: 255, g: 0, b: 0, a: 1});
      });
    });

    it('should handle single string color', () => {
      const colors: Color[] = ['red'];
      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      result.forEach(color => {
        expect(color).toEqual({r: 255, g: 0, b: 0, a: 1});
      });
    });
  });

  describe('Multiple colors (3+ colors)', () => {
    it('should create gradient through three colors', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1}, // red
        {r: 0, g: 255, b: 0, a: 1}, // green
        {r: 0, g: 0, b: 255, a: 1}  // blue
      ];

      const result = fadeColors(colors, 5);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1}); // red
      expect(result[1]).toEqual({r: 128, g: 128, b: 0, a: 1}); // red to green
      expect(result[2]).toEqual({r: 0, g: 255, b: 0, a: 1}); // green
      expect(result[3]).toEqual({r: 0, g: 128, b: 128, a: 1}); // green to blue
      expect(result[4]).toEqual({r: 0, g: 0, b: 255, a: 1}); // blue
    });

    it('should handle four colors with even distribution', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1},   // red
        {r: 255, g: 255, b: 0, a: 1}, // yellow
        {r: 0, g: 255, b: 0, a: 1},   // green
        {r: 0, g: 0, b: 255, a: 1}    // blue
      ];

      const result = fadeColors(colors, 7);

      expect(result).toHaveLength(7);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});   // red
      expect(result[2]).toEqual({r: 255, g: 255, b: 0, a: 1}); // yellow
      expect(result[4]).toEqual({r: 0, g: 255, b: 0, a: 1});   // green
      expect(result[6]).toEqual({r: 0, g: 0, b: 255, a: 1});   // blue
    });
  });

  describe('Alpha channel handling', () => {
    it('should interpolate alpha values', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1},   // fully opaque red
        {r: 255, g: 0, b: 0, a: 0}    // fully transparent red
      ];

      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[1]).toEqual({r: 255, g: 0, b: 0, a: 0.5});
      expect(result[2]).toEqual({r: 255, g: 0, b: 0, a: 0});
    });

    it('should handle colors with different alpha values', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 0.2},
        {r: 0, g: 255, b: 0, a: 0.8}
      ];

      const result = fadeColors(colors, 3);

      expect(result[0]!.a).toBe(0.2);
      expect(result[1]!.a).toBe(0.5);
      expect(result[2]!.a).toBe(0.8);
    });

    it('should handle string colors with alpha (rgba)', () => {
      const colors: Color[] = [
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 255, 0, 1)'
      ];

      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      expect(result[0]!.a).toBe(0.5);
      expect(result[2]!.a).toBe(1);
    });
  });

  describe('Large output sizes', () => {
    it('should handle large output sizes correctly', () => {
      const colors: Color[] = [
        {r: 0, g: 0, b: 0, a: 1},
        {r: 255, g: 255, b: 255, a: 1}
      ];

      const result = fadeColors(colors, 101);

      expect(result).toHaveLength(101);
      expect(result[0]).toEqual({r: 0, g: 0, b: 0, a: 1});
      expect(result[100]).toEqual({r: 255, g: 255, b: 255, a: 1});

      // Check some intermediate values
      expect(result[25]!.r).toBeCloseTo(64, 1);
      expect(result[50]!.r).toBeCloseTo(128, 1);
      expect(result[75]!.r).toBeCloseTo(191, 1);
    });

    it('should maintain smooth progression with many colors', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1},   // red
        {r: 255, g: 255, b: 0, a: 1}, // yellow
        {r: 0, g: 255, b: 0, a: 1},   // green
        {r: 0, g: 255, b: 255, a: 1}, // cyan
        {r: 0, g: 0, b: 255, a: 1},   // blue
        {r: 255, g: 0, b: 255, a: 1}  // magenta
      ];

      const result = fadeColors(colors, 51); // 50 segments, 51 points

      expect(result).toHaveLength(51);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[50]).toEqual({r: 255, g: 0, b: 255, a: 1});
    });
  });

  describe('Edge cases and small sizes', () => {
    it('should handle outputSize of 2', () => {
      const colors: Color[] = [
        {r: 255, g: 0, b: 0, a: 1},
        {r: 0, g: 0, b: 255, a: 1}
      ];

      const result = fadeColors(colors, 2);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[1]).toEqual({r: 0, g: 0, b: 255, a: 1});
    });

    it('should handle non-integer intermediate values correctly', () => {
      const colors: Color[] = [
        {r: 0, g: 0, b: 0, a: 1},
        {r: 100, g: 100, b: 100, a: 1}
      ];

      const result = fadeColors(colors, 4);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({r: 0, g: 0, b: 0, a: 1});
      expect(result[1]!.r).toBeCloseTo(33, 0); // 100/3, rounded
      expect(result[2]!.r).toBeCloseTo(67, 0); // 200/3, rounded
      expect(result[3]).toEqual({r: 100, g: 100, b: 100, a: 1});
    });
  });

  describe('Error handling', () => {
    it('should throw error for empty colors array', () => {
      expect(() => fadeColors([], 5)).toThrow('Colors array cannot be empty');
    });

    it('should throw error for outputSize <= 0', () => {
      const colors: Color[] = [{r: 255, g: 0, b: 0, a: 1}];

      expect(() => fadeColors(colors, 0)).toThrow('Output size must be greater than 0');
      expect(() => fadeColors(colors, -1)).toThrow('Output size must be greater than 0');
      expect(() => fadeColors(colors, -10)).toThrow('Output size must be greater than 0');
    });

    it('should throw error when empty array with outputSize 1', () => {
      expect(() => fadeColors([], 1)).toThrow('Colors array cannot be empty');
    });
  });

  describe('Return value properties', () => {
    it('should return new RGBAColor objects (not references)', () => {
      const originalColor = {r: 255, g: 0, b: 0, a: 1};
      const colors: Color[] = [originalColor];

      const result = fadeColors(colors, 3);

      // Modify the result to ensure it's not a reference
      result[0]!.r = 0;
      expect(originalColor.r).toBe(255); // Original should be unchanged
    });

    it('should return rounded integer values for RGB', () => {
      const colors: Color[] = [
        {r: 0, g: 0, b: 0, a: 1},
        {r: 100, g: 100, b: 100, a: 1}
      ];

      const result = fadeColors(colors, 6);

      result.forEach(color => {
        expect(Number.isInteger(color.r)).toBe(true);
        expect(Number.isInteger(color.g)).toBe(true);
        expect(Number.isInteger(color.b)).toBe(true);
        expect(Number.isInteger(color.a)).toBe(true);
      });
    });

    it('should maintain proper RGBA color structure', () => {
      const colors: Color[] = ['red', 'blue'];
      const result = fadeColors(colors, 3);

      result.forEach(color => {
        expect(color).toHaveProperty('r');
        expect(color).toHaveProperty('g');
        expect(color).toHaveProperty('b');
        expect(color).toHaveProperty('a');
        expect(typeof color.r).toBe('number');
        expect(typeof color.g).toBe('number');
        expect(typeof color.b).toBe('number');
        expect(typeof color.a).toBe('number');
      });
    });
  });

  describe('Complex color formats', () => {
    it('should handle hex colors', () => {
      const colors: Color[] = ['#ff0000', '#00ff00', '#0000ff'];
      const result = fadeColors(colors, 5);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[2]).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(result[4]).toEqual({r: 0, g: 0, b: 255, a: 1});
    });

    it('should handle HSL colors', () => {
      const colors: Color[] = [
        'hsl(0, 100%, 50%)',   // red
        'hsl(120, 100%, 50%)' // green
      ];

      const result = fadeColors(colors, 3);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[2]).toEqual({r: 0, g: 255, b: 0, a: 1});
    });

    it('should handle named colors', () => {
      const colors: Color[] = ['red', 'lime', 'blue'];
      const result = fadeColors(colors, 5);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(result[2]).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(result[4]).toEqual({r: 0, g: 0, b: 255, a: 1});
    });
  });
});

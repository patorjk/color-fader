import {describe, it, expect} from 'vitest';
import {cssColorToRgba, type RgbaColor} from '../src/color-parser';

describe('cssColorToRgba', () => {
  describe('Hex colors', () => {
    it('should parse 3-digit hex colors', () => {
      expect(cssColorToRgba('#f00')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('#0f0')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('#00f')).toEqual({r: 0, g: 0, b: 255, a: 1});
      expect(cssColorToRgba('#abc')).toEqual({r: 170, g: 187, b: 204, a: 1});
    });

    it('should parse 4-digit hex colors with alpha', () => {
      expect(cssColorToRgba('#f008')).toEqual({r: 255, g: 0, b: 0, a: 136 / 255});
      expect(cssColorToRgba('#0f0f')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('#00f0')).toEqual({r: 0, g: 0, b: 255, a: 0});
    });

    it('should parse 6-digit hex colors', () => {
      expect(cssColorToRgba('#ff0000')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('#00ff00')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('#0000ff')).toEqual({r: 0, g: 0, b: 255, a: 1});
      expect(cssColorToRgba('#123456')).toEqual({r: 18, g: 52, b: 86, a: 1});
    });

    it('should parse 8-digit hex colors with alpha', () => {
      expect(cssColorToRgba('#ff000080')).toEqual({r: 255, g: 0, b: 0, a: 128 / 255});
      expect(cssColorToRgba('#00ff00ff')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('#0000ff00')).toEqual({r: 0, g: 0, b: 255, a: 0});
    });

    it('should handle uppercase hex colors', () => {
      expect(cssColorToRgba('#FF0000')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('#ABC')).toEqual({r: 170, g: 187, b: 204, a: 1});
    });

    it('should throw error for invalid hex formats', () => {
      expect(() => cssColorToRgba('#')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('#f')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('#ff')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('#fffff')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('#fffffff')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('#fffffffff')).toThrow('Invalid hex color format');
    });
  });

  describe('RGB colors', () => {
    it('should parse rgb() format', () => {
      expect(cssColorToRgba('rgb(255, 0, 0)')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('rgb(0, 255, 0)')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('rgb(0, 0, 255)')).toEqual({r: 0, g: 0, b: 255, a: 1});
      expect(cssColorToRgba('rgb(128, 64, 192)')).toEqual({r: 128, g: 64, b: 192, a: 1});
    });

    it('should parse rgba() format', () => {
      expect(cssColorToRgba('rgba(255, 0, 0, 0.5)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
      expect(cssColorToRgba('rgba(0, 255, 0, 1)')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('rgba(0, 0, 255, 0)')).toEqual({r: 0, g: 0, b: 255, a: 0});
    });

    it('should handle percentage values in rgb', () => {
      expect(cssColorToRgba('rgb(100%, 0%, 0%)')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('rgb(50%, 50%, 50%)')).toEqual({r: 128, g: 128, b: 128, a: 1});
    });

    it('should handle percentage alpha values', () => {
      expect(cssColorToRgba('rgba(255, 0, 0, 50%)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
      expect(cssColorToRgba('rgba(255, 0, 0, 100%)')).toEqual({r: 255, g: 0, b: 0, a: 1});
    });

    it('should handle spaces and extra whitespace', () => {
      expect(cssColorToRgba('rgb( 255 , 0 , 0 )')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('rgba(255,0,0,0.5)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
    });

    it('should handle slash notation for alpha (CSS Color Module Level 4)', () => {
      expect(cssColorToRgba('rgb(255 0 0 / 0.5)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
      expect(cssColorToRgba('rgb(255 0 0 / 50%)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
    });

    it('should clamp values to valid ranges', () => {
      expect(cssColorToRgba('rgb(300, -50, 1000)')).toEqual({r: 255, g: 0, b: 255, a: 1});
    });

    it('should throw error for invalid rgb formats', () => {
      expect(() => cssColorToRgba('rgb(255, 0)')).toThrow('Invalid RGB color format');
      expect(() => cssColorToRgba('rgb(255, 0, 0, 0, 0)')).toThrow('Invalid RGB color format');
      expect(() => cssColorToRgba('rgb(invalid)')).toThrow('Invalid RGB color format');
      expect(() => cssColorToRgba('rgb(')).toThrow('Invalid RGB color format');
    });
  });

  describe('HSL colors', () => {
    it('should parse hsl() format', () => {
      expect(cssColorToRgba('hsl(0, 100%, 50%)')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('hsl(120, 100%, 50%)')).toEqual({r: 0, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('hsl(240, 100%, 50%)')).toEqual({r: 0, g: 0, b: 255, a: 1});
    });

    it('should parse hsla() format', () => {
      expect(cssColorToRgba('hsla(0, 100%, 50%, 0.5)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
      expect(cssColorToRgba('hsla(120, 100%, 50%, 1)')).toEqual({r: 0, g: 255, b: 0, a: 1});
    });

    it('should handle different hue values', () => {
      expect(cssColorToRgba('hsl(60, 100%, 50%)')).toEqual({r: 255, g: 255, b: 0, a: 1});
      expect(cssColorToRgba('hsl(180, 100%, 50%)')).toEqual({r: 0, g: 255, b: 255, a: 1});
      expect(cssColorToRgba('hsl(300, 100%, 50%)')).toEqual({r: 255, g: 0, b: 255, a: 1});
    });

    it('should handle saturation and lightness variations', () => {
      // Fully desaturated should be gray
      expect(cssColorToRgba('hsl(0, 0%, 50%)')).toEqual({r: 128, g: 128, b: 128, a: 1});

      // Full lightness should be white
      expect(cssColorToRgba('hsl(0, 100%, 100%)')).toEqual({r: 255, g: 255, b: 255, a: 1});

      // No lightness should be black
      expect(cssColorToRgba('hsl(0, 100%, 0%)')).toEqual({r: 0, g: 0, b: 0, a: 1});
    });

    it('should handle percentage alpha in hsla', () => {
      expect(cssColorToRgba('hsla(0, 100%, 50%, 50%)')).toEqual({r: 255, g: 0, b: 0, a: 0.5});
    });

    it('should throw error for invalid hsl formats', () => {
      expect(() => cssColorToRgba('hsl(0, 100%)')).toThrow('Invalid HSL color format');
      expect(() => cssColorToRgba('hsl(0, 100%, 50%, 0.5, extra)')).toThrow('Invalid HSL color format');
      expect(() => cssColorToRgba('hsl(')).toThrow('Invalid HSL color format');
    });
  });

  describe('Named colors', () => {
    it('should parse basic named colors', () => {
      expect(cssColorToRgba('red')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('green')).toEqual({r: 0, g: 128, b: 0, a: 1});
      expect(cssColorToRgba('blue')).toEqual({r: 0, g: 0, b: 255, a: 1});
      expect(cssColorToRgba('white')).toEqual({r: 255, g: 255, b: 255, a: 1});
      expect(cssColorToRgba('black')).toEqual({r: 0, g: 0, b: 0, a: 1});
    });

    it('should parse extended named colors', () => {
      expect(cssColorToRgba('aliceblue')).toEqual({r: 240, g: 248, b: 255, a: 1});
      expect(cssColorToRgba('antiquewhite')).toEqual({r: 250, g: 235, b: 215, a: 1});
      expect(cssColorToRgba('rebeccapurple')).toEqual({r: 102, g: 51, b: 153, a: 1});
    });

    it('should handle transparent color', () => {
      expect(cssColorToRgba('transparent')).toEqual({r: 0, g: 0, b: 0, a: 0});
    });

    it('should handle case insensitivity', () => {
      expect(cssColorToRgba('RED')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('Blue')).toEqual({r: 0, g: 0, b: 255, a: 1});
      expect(cssColorToRgba('AliceBlue')).toEqual({r: 240, g: 248, b: 255, a: 1});
    });

    it('should handle both gray and grey spellings', () => {
      expect(cssColorToRgba('gray')).toEqual({r: 128, g: 128, b: 128, a: 1});
      expect(cssColorToRgba('grey')).toEqual({r: 128, g: 128, b: 128, a: 1});
      expect(cssColorToRgba('darkgray')).toEqual({r: 169, g: 169, b: 169, a: 1});
      expect(cssColorToRgba('darkgrey')).toEqual({r: 169, g: 169, b: 169, a: 1});
    });
  });

  describe('Input normalization', () => {
    it('should handle whitespace', () => {
      expect(cssColorToRgba('  #ff0000  ')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('  red  ')).toEqual({r: 255, g: 0, b: 0, a: 1});
    });

    it('should handle mixed case', () => {
      expect(cssColorToRgba('#FF0000')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('RGB(255, 0, 0)')).toEqual({r: 255, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('HSL(0, 100%, 50%)')).toEqual({r: 255, g: 0, b: 0, a: 1});
    });
  });

  describe('Error handling', () => {
    it('should throw error for unsupported formats', () => {
      expect(() => cssColorToRgba('invalid')).toThrow('Unsupported color format: invalid');
      expect(() => cssColorToRgba('')).toThrow('Unsupported color format: ');
      expect(() => cssColorToRgba('cmyk(100, 0, 0, 0)')).toThrow('Unsupported color format');
    });

    it('should throw error for malformed input', () => {
      expect(() => cssColorToRgba('#')).toThrow('Invalid hex color format');
      expect(() => cssColorToRgba('rgb(')).toThrow('Invalid RGB color format');
      expect(() => cssColorToRgba('hsl(')).toThrow('Invalid HSL color format');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero values', () => {
      expect(cssColorToRgba('rgb(0, 0, 0)')).toEqual({r: 0, g: 0, b: 0, a: 1});
      expect(cssColorToRgba('rgba(0, 0, 0, 0)')).toEqual({r: 0, g: 0, b: 0, a: 0});
      expect(cssColorToRgba('hsl(0, 0%, 0%)')).toEqual({r: 0, g: 0, b: 0, a: 1});
    });

    it('should handle maximum values', () => {
      expect(cssColorToRgba('rgb(255, 255, 255)')).toEqual({r: 255, g: 255, b: 255, a: 1});
      expect(cssColorToRgba('rgba(255, 255, 255, 1)')).toEqual({r: 255, g: 255, b: 255, a: 1});
    });

    it('should handle decimal values', () => {
      expect(cssColorToRgba('rgba(255.5, 127.3, 63.9, 0.75)')).toEqual({r: 255, g: 127, b: 64, a: 0.75});
    });
  });

  describe('Type checking', () => {
    it('should return correct RGBAColor interface', () => {
      const result: RgbaColor = cssColorToRgba('#ff0000');
      expect(typeof result.r).toBe('number');
      expect(typeof result.g).toBe('number');
      expect(typeof result.b).toBe('number');
      expect(typeof result.a).toBe('number');
      expect(result).toHaveProperty('r');
      expect(result).toHaveProperty('g');
      expect(result).toHaveProperty('b');
      expect(result).toHaveProperty('a');
    });
  });
});

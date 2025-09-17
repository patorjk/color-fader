import {describe, it, vi, beforeEach, afterEach, expect, beforeAll} from 'vitest';
import {fadeColors} from '../src/color-fader';

describe('color-fader', () => {

  it('should fade red into blue', () => {
    const colors = ['#ff0000', '#0000ff'];
    const output = fadeColors(colors, 10)

    expect(output).toStrictEqual(
      [
        {r: 255, b: 0, g: 0},
        {r: 227, b: 28, g: 0},
        {r: 198, b: 57, g: 0},
        {r: 170, b: 85, g: 0},
        {r: 142, b: 113, g: 0},
        {r: 113, b: 142, g: 0},
        {r: 85, b: 170, g: 0},
        {r: 57, b: 198, g: 0},
        {r: 28, b: 227, g: 0},
        {r: 0, b: 255, g: 0}
      ]
    );
  });

  it('should fade red into green and then blue', () => {
    const colors = ['#ff0000', '#0f0', '#0000ff'];
    const output = fadeColors(colors, 9);

    expect(output).toStrictEqual(
      [
        {r: 255, b: 0, g: 0},
        {r: 191, b: 0, g: 64},
        {r: 128, b: 0, g: 128},
        {r: 64, b: 0, g: 191},
        {r: 0, b: 0, g: 255},
        {r: 0, b: 64, g: 191},
        {r: 0, b: 128, g: 128},
        {r: 0, b: 191, g: 64},
        {r: 0, b: 255, g: 0}
      ]
    );
  });

});

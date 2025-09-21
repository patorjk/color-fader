# color-fader

A simple library for fading colors together. Example:

```ts
import {fadeColors, type RgbaColor} from 'color-fader';

const colors = ['#ff0000', '#0f0', '#0000ff'];
const output: RgbaColor[] = fadeColors(colors, 9);
```

`output` would then equal:

```ts
[
  {r: 255, b: 0, g: 0, a: 1},
  {r: 191, b: 0, g: 64, a: 1},
  {r: 128, b: 0, g: 128, a: 1},
  {r: 64, b: 0, g: 191, a: 1},
  {r: 0, b: 0, g: 255, a: 1},
  {r: 0, b: 64, g: 191, a: 1},
  {r: 0, b: 128, g: 128, a: 1},
  {r: 0, b: 191, g: 64, a: 1},
  {r: 0, b: 255, g: 0, a: 1}
]
```

## getCssRgbaColor

Simple function to convert an RGBAColor object to a CSS string.

```ts
// "rgba(255, 0, 0, 1)"
const css: string = getCssRgbaColor({r: 255, b: 0, g: 0, a: 1});
```

## getCssHexColor

Simple function to convert an RGBAColor object to a CSS hex string.

```ts
// "#ff0000"
const css: string = getCssHexColor({r: 255, b: 0, g: 0, a: 1});
```

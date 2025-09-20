# color-fader

A simple library for fading colors together. Example:

```ts
import {fadeColors} from 'color-fader';

const colors = ['#ff0000', '#0f0', '#0000ff'];
const output = fadeColors(colors, 9);
```

`output` would then equal:

```ts
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
```

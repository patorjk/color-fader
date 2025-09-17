import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/color-fader.ts'),
      name: 'color-fader',
      formats: ['es'],
      fileName: (format) => `color-fader.${format}.js`
    },
    minify: true,
    rollupOptions: {
      external: [], // Add external dependencies here
      output: [
        // ES modules output
        {
          format: "es",
          entryFileNames: "[name].js",
          dir: "dist",
        },
      ]
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    // Generate ES module type declarations
    dts({
      include: ["src"],
      outDir: "dist/types",
      tsconfigPath: "tsconfig.json",
      insertTypesEntry: true,
      rollupTypes: true,
      pathsToAliases: true
    }),
  ]
})

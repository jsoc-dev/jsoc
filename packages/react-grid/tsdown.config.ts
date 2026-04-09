import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "plugins/ag": "src/plugins/ag/index.ts",
    "plugins/ant": "src/plugins/ant/index.ts",
    "plugins/mantine": "src/plugins/mantine/index.ts",
    "plugins/mui": "src/plugins/mui/index.ts",
    "plugins/prime": "src/plugins/prime/index.ts",
    "plugins/tanstack": "src/plugins/tanstack/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  outputOptions: {
    // without this option, it might pick a filename (e.g. cellRenderers-[hash].mjs)
    // shared chunk contains content of multiple files and giving that shared chunk a
    // specific file name can be misleading
    chunkFileNames: "shared-[hash].mjs",
  },
});

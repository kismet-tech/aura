import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" with { type: "json" };
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';
import strip from '@rollup/plugin-strip';

import postcss from "rollup-plugin-postcss";

// 👇new imports
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
      },
      {
        file: packageJson.module,
        format: "esm",
      },
    ],
    plugins: [
      peerDepsExternal(), // 👈 new line
      resolve(),
      commonjs(),
          strip({
      include: '**/*.(js|ts|tsx)',
      // Remove specific directives
      // Note: strip plugin removes patterns; to remove "use client", you can use regex in a custom plugin if needed
    }),
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      postcss({
        plugins: [],
      }),
      json(),
      terser(), // 👈 new line
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      postcss({
        plugins: [autoprefixer()],
        extract: true, // Extract CSS to a separate file
        minimize: true,
      }),
    ],
    external: ["react", "react-dom", /\.(css|less|scss)$/],
  },
];

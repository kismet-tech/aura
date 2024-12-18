import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" with { type: "json" };
import json from '@rollup/plugin-json';
import autoprefixer from 'autoprefixer';
import replace from '@rollup/plugin-replace';


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
      replace({
        // Remove "use client"; directives
        // The `preventAssignment` option is recommended to avoid unexpected behavior
        preventAssignment: true,
        // Patterns to replace
        // Replace '"use client";' with an empty string
        delimiters: ['', ''],
        // The key is the exact string to match, and the value is the replacement
        // Ensure that the directive includes the semicolon and quotes
        '"use client";': '',
        "'use client';": '',
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

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" with { type: "json" };

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
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      postcss({
        plugins: [],
      }),
      terser(), // 👈 new line
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: ["react", "react-dom", /\.(css|less|scss)$/],
  },
];

import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import external from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import url from "@rollup/plugin-url"
import json from "@rollup/plugin-json"

export default {
  input: {
    index: "src/index.js",
    "Field/index": "src/Field/index.js",
    "Variable/index": "src/Variable/index.js",
    "GenericObject/index": "src/GenericObject/index.js",
    "GenericDimension/index": "src/GenericDimension/index.js",
    "GenericBookmark/index": "src/GenericBookmark/index.js",
    "GenericVariable/index": "src/GenericVariable/index.js",
    "GenericMeasure/index": "src/GenericMeasure/index.js",
    "Doc/index": "src/Doc/index.js",
    "Global/index": "src/Global/index.js",
  },
  output: [
    {
      // file: pkg.main,
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    {
      // file: pkg.module,
      dir: "dist",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url({ exclude: ["**/*.svg"] }),
    babel({ exclude: "node_modules/**" }),
    resolve(),
    commonjs({ namedExports: { "node_modules/lodash/lodash.js": ["functions", "isEqual", "omit"] } }),
    json(),
  ],
}

import copy from "rollup-plugin-copy";

export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "iife",
    name: "game",
    sourcemap: true,
  },
  plugins: [
    copy({
      targets: [{ src: "public/*", dest: "dist" }],
    }),
  ],
};

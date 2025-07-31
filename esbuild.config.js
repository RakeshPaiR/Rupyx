const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

const isWatch = process.argv.includes("--watch");

esbuild
  .build({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    outfile: "dist/client.js",
    format: "esm",
    sourcemap: true,
    logLevel: "info",
    plugins: [sassPlugin({ type: "style" })],
  })
  .then((result) => {
    if (isWatch && result.watch) {
      result.watch({
        onRebuild(error) {
          if (error) console.error("❌ Rebuild failed:", error);
          else console.log("✅ JS Rebuilt");
        },
      });
      console.log("👀 Watching JS changes...");
    }
  })
  .catch(() => process.exit(1));

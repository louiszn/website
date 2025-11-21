import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: "esm",
	splitting: false,
	sourcemap: process.env.NODE_ENV === "development",
	minifySyntax: true,
	minifyIdentifiers: true,
	clean: true,
});

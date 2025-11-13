// @ts-check
import eslint from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";

import globals from "globals";

import svelteParser from "svelte-eslint-parser";
import tseslint from "typescript-eslint";

import { fileURLToPath } from "node:url";

import svelteConfig from "./apps/web/svelte.config.js";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	eslint.configs.recommended,
	...tseslint.configs.stylistic,
	...tseslint.configs.strict,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: ["./apps/*/tsconfig.eslint.json"],
			},
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: svelteParser,
			parserOptions: {
				svelteConfig,
				parser: tseslint.parser,
			},
		}
	},
	{
		rules: {
			"no-undef": "off",
			semi: ["error", "always"],
		},
	},
);

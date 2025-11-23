import type App from "../base/App.js";

import config from "../config.js";
import cors from "@fastify/cors";

export function usePlugins(app: App) {
	const { instance } = app;

	instance.register(cors, {
		origin: config.corsOrigin,
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
}

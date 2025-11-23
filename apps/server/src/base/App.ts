import Fastify from "fastify";
import { usePlugins } from "../plugins/index.js";
import { useRoutes } from "../routes/index.js";

export default class App {
	public readonly instance = Fastify();

	public constructor() {
		this.registerPlugins();
		this.registerRoutes();
	}

	private registerPlugins() {
		usePlugins(this);
	}

	private registerRoutes() {
		useRoutes(this);
	}

	public async start(port: number) {
		try {
			await this.instance.listen({ port });
			console.log(`Server running on port ${port}`);
		} catch (err) {
			console.error("Error starting server:", err);
			process.exit(1);
		}
	}
}

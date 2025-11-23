import type App from "../base/App.js";

export function useRoutes(app: App) {
	const { instance } = app;

	instance.get("/", (req, res) => {
		res.status(200).send({
			message: "Hello world",
		});
	});
}

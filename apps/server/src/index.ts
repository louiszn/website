import App from "./base/App.js";
import config from "./config.js";

const app = new App();

await app.start(config.port);

import express from "express";
import routes from "./routes";
import { errorHandler } from "./infrastructure/http/middlewares/error.middleware";
import { notFoundHandler } from "./infrastructure/http/middlewares/not-found.middleware";

const app = express();
app.use(express.json());
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
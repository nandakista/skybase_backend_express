import express from "express";
import routes from "./routes";
import { errorHandler } from "./infrastructure/http/middlewares/error.middleware";
import { notFoundHandler } from "./infrastructure/http/middlewares/not-found.middleware";

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ["http://127.0.0.1:5500"];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
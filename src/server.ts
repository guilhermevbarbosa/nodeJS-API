import express from "express";
import cors from "cors";
import "express-async-errors";

import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(8080);

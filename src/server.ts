import express from "express";
import cors from "cors";
import "express-async-errors";
import helmet from "helmet";

require("dotenv/config");

import "./database/connection";
import routes from "./routes";
import errorHandler from "./shared/errors/errorHandler";

import "./shared/container";

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.disable("x-powered-by");
app.use(helmet());

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(8080);

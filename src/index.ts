import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { ENV } from "./constants/env";
import logger from "./helpers/logger";

app.listen(ENV.PORT, () => logger(`Server is Live on PORT ${ENV.PORT} 😊😊`));

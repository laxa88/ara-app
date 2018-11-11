import cors, { CorsOptions } from "cors";
import config from "../../../config";

// Reference: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
const corsConfig: CorsOptions = {
  origin: (origin, cb) => {
    const { clientPort } = config;

    // Allow requests with no origin, e.g. Postman, Insomnia, etc.
    if (!origin) {
      return cb(null, true);
    }

    const allowedOrigins = [`http://localhost:${clientPort}`];

    if (allowedOrigins.indexOf(origin) === -1) {
      return cb(new Error("CORS violation: Invalid origin."), false);
    }

    return cb(null, true);
  },
};

export default cors(corsConfig);

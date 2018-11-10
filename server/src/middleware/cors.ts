import cors, { CorsOptions } from "cors";

// Reference: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
const corsConfig: CorsOptions = {
  origin: (origin, cb) => {
    // Allow requests with no origin, e.g. Postman, Insomnia, etc.
    if (!origin) {
      return cb(null, true);
    }

    const allowedOrigins = ["http://localhost:3001"];

    if (allowedOrigins.indexOf(origin) === -1) {
      return cb(new Error("CORS violation: Invalid origin."), false);
    }

    return cb(null, true);
  },
};

export default cors(corsConfig);

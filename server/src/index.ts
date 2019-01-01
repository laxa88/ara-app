import bodyParser from "body-parser";
import express from "express";
import config from "../../config";
import cors from "./middleware/cors";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";

const app = express();

// ==================================================
// middleware
// ==================================================

// Required to parse form and json data in req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors);

// ==================================================
// paths
// ==================================================

app.get("/", (req, res) => res.send("Server is up!"));
app.use("/api", publicRoutes);
app.use("/api", privateRoutes);

// ==================================================
// entry
// ==================================================

app.listen(config.serverPort, () =>
  console.log(`Server listening on port ${config.serverPort}.`),
);

const displayRoutes = (r: any) => {
  if (r.route && r.route.path) {
    const path = `${Object.keys(r.route.methods)[0].toUpperCase()} ${
      r.route.path
    }`;
    console.log(path);
  }
};

app._router.stack.forEach(displayRoutes);
publicRoutes.stack.forEach(displayRoutes);
privateRoutes.stack.forEach(displayRoutes);

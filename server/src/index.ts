import bodyParser from "body-parser";
import express from "express";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";

const app = express();
const port = 3000;

// ==================================================
// middleware
// ==================================================

// Required to parse form and json data in req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==================================================
// paths
// ==================================================

app.get("/", (req, res) => res.send("Server is up!"));
app.use("/api", publicRoutes);
app.use("/api", privateRoutes);

// ==================================================
// entry
// ==================================================

app.listen(port, () => console.log(`Server listening on port ${port}.`));

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

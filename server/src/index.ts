import bodyParser from "body-parser";
import express from "express";
import * as helper from "./helper";
import routes from "./routes";

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
app.use("/api", routes);

// ==================================================
// entry
// ==================================================

// tslint:disable no-console
app.listen(port, () => console.log(`Server listening on port ${port}.`));

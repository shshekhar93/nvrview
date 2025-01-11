import express from "express";
import * as path from "node:path";
import { Application } from "express-ws";
import { setupVideoProxy } from "./video-proxy";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
setupVideoProxy(app as any as Application);

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../build")));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

import express from "express";
import { resolve } from "path";

const app = express();
const PORT = 3004;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(resolve("./index.html"));
});
app.listen(3004);

import express from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import path from "path";

// configure env variables
const envFilePath = ".env";
dotenv.config({ path: path.normalize(envFilePath) });

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(resolve("./index.html"));
});
app.listen(PORT);

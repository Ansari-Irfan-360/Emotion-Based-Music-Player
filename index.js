import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/emotion-recognition", (req, res) => {
  res.sendFile(__dirname + "/public/face.html");
});

app.get("/application", (req, res) => {
  res.sendFile(__dirname + "/public/application.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.listen(PORT, () => {
  console.log("Listening on port "+PORT);
});

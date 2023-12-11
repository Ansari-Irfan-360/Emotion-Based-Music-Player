import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

import express from "express";
import { renderToString } from "react-dom/server";
import Home from "../pages/Home";
import { buildHtml } from "./template";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.static("dist"));

app.get("/", (_req, res) => {
  const data = { message: "Hello from Server" };
  const html = renderToString(<Home initialData={data} />);
  res.send(buildHtml(html, data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

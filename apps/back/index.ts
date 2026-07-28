import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

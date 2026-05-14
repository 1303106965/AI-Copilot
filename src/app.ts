import express from "express";
import { initDB } from "./db/init";

const app = express();

app.use(express.json());

const start = async () => {
  await initDB();

  app.listen(3001, () => {
    console.log("server running 3000");
  });
};

start();

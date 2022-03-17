import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes";

const server = express();
server.use(morgan("dev"));
server.use(express.json());
dotenv.config();

server.use(router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(process.env);
});

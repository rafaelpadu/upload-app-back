import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/routes";
import morgan from "morgan";
import dbInit from "./config/mongoDB";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);
app.use(function (req, res) {
  // Invalid request
  res.status(404).json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
      stack: "http://localhost:3001/",
    },
    message: "Porta invalida!",
  });
});
try {
  dbInit();
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
} catch (error) {
  console.log(`Error occured: ${error}`);
}

import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3002;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("hi there, welcom to formcraft backend!!");
});

app.listen(port, () => {
  console.log("listning on port ", port);
});

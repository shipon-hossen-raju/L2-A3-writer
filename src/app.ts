console.clear();

import express, { Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();
app.use(express.json());

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app routes
app.use("/api/", router);

// ------------------
// global Error Handle
app.use(globalErrorHandler);

export default app;

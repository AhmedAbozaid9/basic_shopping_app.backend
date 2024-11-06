import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import sequelize from "./utils/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with nyaa hello");
});
app.use("/api/auth", authRoutes);

app.get("/api/status", (_, res: Response) => {
  const status = {
    status: "Running",
  };
  res.send(status);
});

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });

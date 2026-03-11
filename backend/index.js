import express from "express";
import cors from "cors";
import { Router } from "express";

const app = express();
const PORT = 5000;
const router = Router();
// import { publicRouter } from "./routes/public-routes.js";
import  publicRouter  from "./routes/public-routes.js";
import privateRouter from "./routes/private-routes.js";

app.use(cors());
app.use(express.json());
app.use("/api", publicRouter);
app.use("/api", privateRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

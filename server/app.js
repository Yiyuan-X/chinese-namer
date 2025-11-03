import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import namesRouter from "./routes/names.js";
import userRouter from "./routes/user.js";
import payRouter from "./routes/pay.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ ok: true, name: "佳名启运 API", version: "1.1.0" });
});

app.use("/api/names", namesRouter);
app.use("/api/user", userRouter);
app.use("/api/pay", payRouter);

app.listen(PORT, () => {
  console.log(`🚀 Naming server running at http://localhost:${PORT}`);
});

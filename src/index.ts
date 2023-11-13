import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import multer from "multer";
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
  createImage,
} from "./controllers/planets";
import { logIn, signUp } from "./controllers/users";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

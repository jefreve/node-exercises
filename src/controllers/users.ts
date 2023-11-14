import * as dotenv from "dotenv";
dotenv.config();
import db from "../db";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );

  if (user && user.password === password) {
    const { SECRET = "" } = process.env;
    const payload = {
      id: user.id,
      username,
    };
    const token = jwt.sign(payload, SECRET);
    console.log(token);

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    res.status(200).json({ token, id: user.id, username });
  } else {
    res.status(400).json({ msg: "Username or password are incorrect." });
  }
};

const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );

  if (user) {
    res.status(409).json({ msg: "Username already exists." });
  } else {
    await db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    res.status(201).json({ msg: "Signup successful. Now you can log in." });
  }
};

const logOut = async (req: Request, res: Response) => {
  const user: any = req.user;

  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null]);

  res.status(200).json({ msg: "Logout successful." });
};

export { logIn, signUp, logOut };

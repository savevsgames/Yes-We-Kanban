import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user: User | null = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ error: "Authentication failed." });
  }

  // If password is valid we can generate a token - use bcrypt compare method on the
  // typed/hashed password and the "User" instance's hashed password value in the db
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ error: "Authentication failed." });
  }

  // Generate a token with the secret key and the user's id
  const secretKey = process.env.JWT_SECRET_KEY || "";
  // Give the key a 1 hour expiration
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;

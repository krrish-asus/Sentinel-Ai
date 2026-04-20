import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as repo from "../repositories/authRepository.js";

export const registerUser = async (data) => {
  const existing = await repo.findUser(data.email);
  if (existing) throw new Error("User exists");

  const hashed = await bcrypt.hash(data.password, 10);
  return repo.createUser({ ...data, password: hashed });
};

export const loginUser = async (email, password) => {
  const user = await repo.findUser(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};
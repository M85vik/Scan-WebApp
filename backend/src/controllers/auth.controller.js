import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

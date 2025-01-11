import "dotenv/config";
import initKnex from "knex";
import knexConfig from "../knexfile.js";
const knex = initKnex(knexConfig);
import express from "express";
const router = express.Router();

// Libraries to create JWT tokens and hash passwords
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Custom middleware to check JWT tokens on protected routes
import authorise from "../middleware/auth.js";

// Used when hashing the users password (more salt rounds = stronger encrpytion)
const SALT_ROUNDS = 8;

router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You must provide a name, email and password" });
  }

  try {
    // Use bcrypt to hash the password the user provided
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // Create a user record in the database
    const newUserIds = await knex("users").insert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // IMPORTANT: use the hashed password for the password instead of the plain text password
    });

    // Get the new user record and send a response
    const newUser = await knex("users").where({ id: newUserIds[0] }).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: `Couldn't create new user: ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You must provide an email and password" });
  }

  try {
    // Query the DB for a user with the email address provided in the request body
    const user = await knex("users").where({ email: req.body.email }).first();

    // Use bcrypt to check whether the password sent in the request body matches the hashed password in the DB
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      return res
        .status(403)
        .json({ message: "Username/Password combination is incorrect" });
    }

    // Use the jwt library to generate a JWT token for the user.
    // Include the id and email of the user in the payload of the JWT
    // We can access the data in the payload of the JWT later (when the user accesses a protected page)
    const token = jwt.sign(
      {
        id: user.id,
        sub: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Send the JWT token to the client
    res.json({ authToken: token });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
});

// The `authorise` middleware here checks if the user is logged in before processing this endpoint
router.get("/profile", authorise, async (req, res) => {
  try {
    // The `authorise` middleware added the decoded token to `req.token` so we have the users ID from the JWT token.
    // Query the DB for a user with that ID.
    const user = await knex("users").where({ id: req.token.id }).first();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Can't fetch user profile" });
  }
});

export default router;
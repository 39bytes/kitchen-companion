import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import User, { UserDocument } from "../models/user";

const router = express.Router();

/**
 * User registration.
 * @route POST /auth/register
 * @param {string} email.required
 * @param {string} password.required
 * @returns {object} 200 - Success
 */
router.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, errors: "Fields cannot be empty" });
    return;
  }

  if (!req.body.email.includes("@")) {
    res.json({ success: false, errors: "Please enter a valid email address." });
  }

  if (req.body.password.length < 6) {
    res.json({
      success: false,
      errors: "Password must be at least 6 characters.",
    });
  }

  User.findOne(
    { email: req.body.email },
    async (err: Error, doc: UserDocument) => {
      if (err) throw err;
      if (doc) res.json({ success: false, errors: "User already exists" });
      else {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = new User({ email: req.body.email, password: hashedPass });
        await user.save();
        res.json({ success: true, errors: "" });
      }
    }
  );
});

/**
 * Login with email and password.
 * @route POST /auth/login
 * @param {string} email.required
 * @param {string} password.required
 * @returns {object} 200 - Success
 */
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, errors: "" });
  } else {
    res.json({ success: false, errors: "Incorrect username or password." });
  }
});

/**
 * Get user information.
 * @route GET /auth/user
 * @returns {object} 200 - Success
 */

router.get("/user", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

/**
 * Logout.
 * @route POST /auth/logout
 * @returns {object} 200 - Success
 */
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logOut((err) => {
      res.send({ err });
    });
  }
});

export default router;

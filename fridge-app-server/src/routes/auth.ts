import express from 'express'
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User, { UserDocument } from '../models/user';
import passport, { use } from 'passport';

const router = express.Router();

/**
 * User registration.
 * @route POST /register
 */
router.post('/register', async (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.json({ success: false, errors: "Fields cannot be empty" });
        return;
    }

    User.findOne({ email: req.body.email }, async (err: Error, doc: UserDocument) => {
        if (err) throw err;
        if (doc) res.json({ success: false, errors: "User already exists" });
        else {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const user = new User({ email: req.body.email, password: hashedPass })
            await user.save();
            res.json({ success: true, errors: "" });
        }
    })
})

/**
 * Login with email and password.
 * @route POST /login
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, errors: "" });
    }
    else {
        res.json({ success: false, errors: "" });
    }
});

router.get('/user', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    }
    else {
        res.json({ user: null });
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logOut((err) => {
            res.send({ err })
        });
    }
})


export default router;
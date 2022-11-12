import express from "express";
import { Error } from "mongoose";
import UserFridge, { UserFridgeDocument } from "../models/userfridge";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        res.json({});
        return;
    }

    UserFridge.findOne({ userId: req.user.id }, async (err: Error, doc: UserFridgeDocument) => {
        if (err) throw err;
        if (doc) {
            res.json(doc);
        }
        else {
            const userFridge = new UserFridge({ userId: req.user.id });
            await userFridge.save();
            console.log("created user fridge", userFridge);
            res.json(userFridge);
        }

    });
});

export default router;



import express from "express";
import { Error, UpdateWriteOpResult } from "mongoose";
import { Ingredient } from "../models/ingredient";
import UserFridge, { UserFridgeDocument } from "../models/userfridge";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    UserFridge.findOne({ userId: req.user.id }, async (err: Error, doc: UserFridgeDocument) => {
        if (err) throw err;
        if (doc) {
            res.json(doc);
        }
        else {
            const userFridge = new UserFridge({ userId: req.user.id, contents: [] });
            await userFridge.save();
            console.log("created user fridge", userFridge);
            res.json(userFridge);
        }

    });
});

router.post("/", async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    const contents = req.body as Ingredient[];
    UserFridge.updateOne({ userId: req.user.id },
        { $set: { contents: contents } },
        { runValidators: true },
        (err: NativeError, result: UpdateWriteOpResult) => {
            if (err) {
                res.json({ error: err })
            }
            else {
                res.json({ error: null });
            }
        });
})

export default router;



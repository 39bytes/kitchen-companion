import express from 'express';
import { UpdateWriteOpResult } from 'mongoose';
import GroceryList, { GroceryItemDocument } from '../models/grocerylist';
import { GroceryListDocument } from '../models/grocerylist';

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    GroceryList.findOne({ userId: req.user.id }, async (err: Error, doc: GroceryListDocument) => {
        if (err) throw err;
        if (doc) {
            res.json(doc);
        }
        else {
            const groceryList = new GroceryList({ userId: req.user.id, contents: [] });
            await groceryList.save();
            console.log("created grocery list", groceryList);
            res.json(groceryList);
        }

    });
});

router.post("/", async (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }

    const contents = req.body as GroceryItemDocument[];
    GroceryList.updateOne({ userId: req.user.id },
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
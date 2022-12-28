import express from "express";
import mongoose, { Error, Mongoose, UpdateWriteOpResult } from "mongoose";
import {
  FridgeIngredient,
  FridgeSection,
  UpdateIngredientPayload,
} from "../models/userfridge";
import UserFridge, { UserFridgeDocument } from "../models/userfridge";
import { getExpirationOrDefault } from "../expiration";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  UserFridge.findOne(
    { userId: req.user.id },
    async (err: Error, doc: UserFridgeDocument) => {
      if (err) throw err;
      if (doc) {
        res.json(doc);
      } else {
        const userFridge = new UserFridge({
          userId: req.user.id,
          contents: [],
        });
        await userFridge.save();
        console.log("created user fridge", userFridge);
        res.json(userFridge);
      }
    }
  );
});

router.post("/", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const contents = req.body as FridgeIngredient[];
  UserFridge.findOneAndUpdate(
    { userId: req.user.id },
    { $set: { contents: contents } },
    { runValidators: true, returnDocument: "after" },
    (err: NativeError, doc: UserFridgeDocument) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(doc);
      }
    }
  );
});

router.post("/addIngredient", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const ingredientData = req.body as FridgeIngredient;
  const ingredientId = new mongoose.Types.ObjectId();
  const newIngredient: FridgeIngredient = {
    ...ingredientData,
    _id: ingredientId,
    dateAdded: Date.now(),
    expirationData: getExpirationOrDefault(ingredientData.name),
  };

  UserFridge.updateOne(
    { userId: req.user.id },
    { $push: { contents: newIngredient } },
    { runValidators: true, returnDocument: "after" },
    (err: NativeError) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(newIngredient);
        console.log("sent response");
      }
    }
  );
});

router.post("/updateIngredient", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  // Just replace the ingredient instead of updating fields
  const data = req.body as UpdateIngredientPayload;

  UserFridge.updateOne(
    { userId: req.user.id, "contents._id": data.ingredientId },
    {
      $set: {
        "contents.$.quantity": data.quantity,
        "contents.$.unit": data.unit,
        "contents.$.section": data.section,
      },
    },
    { runValidators: true, returnDocument: "after" },
    (err: NativeError) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(data);
      }
    }
  );
});

router.post("/deleteIngredient", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  // Just replace the ingredient instead of updating fields
  const { id } = req.body as { id: string };

  UserFridge.updateOne(
    { userId: req.user.id },
    {
      $pull: {
        contents: { _id: id },
      },
    },
    (err: NativeError) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(id);
      }
    }
  );
});

export default router;

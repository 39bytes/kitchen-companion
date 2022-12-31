import express from "express";
import RecipeModel, {
  Recipe,
  RecipeByIngredientResult,
} from "../models/recipe";
import UserFridge, { UserFridgeDocument } from "../models/userfridge";
import { getFromSpoonacular } from "./api";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  RecipeModel.find({ userId: req.user.id }, (err: Error, docs: Recipe[]) => {
    if (err) {
      res.status(500).send(err);
      console.error(err);
    }
    if (docs) {
      res.json(docs);
    }
  });
});

router.get("/recommendations", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  UserFridge.findOne(
    { userId: req.user.id },
    async (err: Error, doc: UserFridgeDocument) => {
      const ingredientNames = new Set(doc.contents.map((i) => i.name));

      const data = await getFromSpoonacular<RecipeByIngredientResult[]>(
        "recipes/findByIngredients",
        {
          ingredients: [...ingredientNames].join(),
          ranking: 2,
          number: 100,
        }
      );

      res.json(data);
    }
  );
});

router.post("/addRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  RecipeModel.findOneAndUpdate(
    { userId: req.user.id, id: req.body.id },
    { $setOnInsert: { ...req.body, userId: req.user.id } },
    { upsert: true, new: true },
    (err: Error, doc: Recipe) => {
      if (err) {
        res.status(400).send(err);
        throw err;
      }
      console.log(doc);
      if (doc) {
        console.log(doc);
        res.json(doc);
      }
    }
  );
});

router.post("/updateRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
});

router.post("/deleteRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const recipeId = req.body.id;

  RecipeModel.deleteOne({ userId: req.user.id, id: recipeId }, (err: Error) => {
    if (err) {
      res.status(400).send(err);
      console.error(err);
    } else {
      res.send(recipeId);
    }
  });
});

export default router;

import express from "express";
import RecipeModel, {
  Recipe,
  RecipeByIngredientResult,
} from "../models/recipe";
import UserFridge, { UserFridgeDocument } from "../models/userfridge";
import { getFromSpoonacular } from "./api";

const router = express.Router();

/**
 * Get all recipes saved by the user.
 * @route GET /recipes
 */

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

/**
 * Get recommendations for recipes based on the user's fridge contents.
 * @route GET /recipes/recommendations
 */

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
        "/recipes/findByIngredients",
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

/**
 * Add a recipe to the user's saved recipes.
 * This route will either create a new recipe or update an existing one.
 * @route POST /recipes/addRecipe
 * @param recipe The recipe data (request body).
 */

router.post("/addRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  RecipeModel.create(
    { ...req.body, userId: req.user.id },
    (err: Error, doc: Recipe) => {
      if (err) {
        res.status(400).send(err);
        throw err;
      }
      if (doc) {
        res.json(doc);
      }
    }
  );
});

/**
 * Update a recipe in the user's saved recipes.
 * @route POST /recipes/updateRecipe
 * @param recipe The recipe data (request body).
 * @returns The updated recipe.
 */

router.post("/updateRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  console.log(req.body);

  RecipeModel.findOneAndUpdate(
    { _id: req.body._id, userId: req.user.id },
    { $set: { ...req.body } },
    { returnOriginal: false },
    (err: Error, doc: Recipe) => {
      if (err) {
        res.status(400).send(err);
        throw err;
      }
      console.log(doc);
      if (doc) {
        res.json(doc);
      }
    }
  );
});

/**
 * Delete a recipe from the user's saved recipes.
 * @route POST /recipes/deleteRecipe
 * @param id The ID of the recipe to delete.
 */

router.post("/deleteRecipe", async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  const recipeId = req.body.id;

  RecipeModel.deleteOne(
    { _id: recipeId, userId: req.user.id },
    (err: Error) => {
      if (err) {
        res.status(400).send(err);
        console.error(err);
      } else {
        res.send(recipeId);
      }
    }
  );
});

export default router;

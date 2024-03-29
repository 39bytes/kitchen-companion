import fuzzysort from "fuzzysort";
import { Ingredient } from "../models/userfridge";

const USEFUL_UNITS = [
  "g",
  "oz",
  "kg",
  "mL",
  "L",
  "large",
  "small",
  "slice",
  "piece",
  "cup",
  "bunch",
];

export const ProcessIngredientResults = (
  query: string,
  results: Ingredient[]
) => {
  // Sorts by name (because spoonacular does not already do this by default for some reason)
  const names = results.map((ing) => ing.name);
  const scores = fuzzysort.go(query, names);

  let sorted: Ingredient[] = [];
  scores.forEach((obj) => {
    const result = results.find((r) => r.name === obj.target);

    // Throw out useless units that just take up space
    const filteredUnits = USEFUL_UNITS.filter((unit) =>
      result.possibleUnits.includes(unit)
    );
    const firstAisle = result.aisle ? result.aisle.split(";")[0] : "Other";
    sorted.push({ ...result, aisle: firstAisle, possibleUnits: filteredUnits });
  });
  return sorted;
};

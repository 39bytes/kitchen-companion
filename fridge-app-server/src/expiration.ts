import fuzzysort from "fuzzysort";
import { ExpirationData } from "./models/userfridge";
import { durationToMs } from "./utils/duration-to-ms";

export const getExpirationOrDefault = (query: string) => {
  // Get all food names from expiration database
  const names = Object.keys(expirations);
  // Fuzzy string match
  const scores = fuzzysort.go(query, names);
  const foodName = scores[0] ? scores[0].target : "";

  // Get matching expiration data
  if (foodName in expirations) {
    return expirations[foodName];
  }
  return { pantry: -1, fridge: -1, freezer: -1 };
};

// Times in milliseconds
const expirations: { [name: string]: ExpirationData } = {
  banana: {
    pantry: durationToMs("3d"),
    fridge: durationToMs("2w"),
    freezer: durationToMs("6m"),
  },
  apple: {
    pantry: durationToMs("5d"),
    fridge: durationToMs("3w"),
    freezer: durationToMs("6m"),
  },
  "chicken breast": {
    pantry: durationToMs("2d"),
    fridge: durationToMs("3w"),
    freezer: durationToMs("6m"),
  },
};

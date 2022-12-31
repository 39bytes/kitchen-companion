import fuzzysort from "fuzzysort";
import { ExpirationData } from "./models/userfridge";
import { durationToMs } from "./utils/duration-to-ms";
import fs from "fs";
import readline from "readline";

const loadExpirationData = async () => {
  const fileStream = fs.createReadStream("expiration_data.csv");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const expirationMap = new Map<string, ExpirationData>();

  for await (const line of rl) {
    if (line.trim().length === 0) {
      continue;
    }

    const [name, pantry, fridge, freezer] = line.split(",");

    expirationMap.set(name, {
      pantry: pantry !== "none" ? durationToMs(pantry) : undefined,
      fridge: fridge !== "none" ? durationToMs(fridge) : undefined,
      freezer: freezer !== "none" ? durationToMs(freezer) : undefined,
    });
  }

  return expirationMap;
};

let expirations: Map<string, ExpirationData>;
loadExpirationData().then((data) => {
  expirations = data;
});

export const getExpirationOrDefault = (query: string) => {
  // Get all food names from expiration database
  const names = [...expirations.keys()];
  // Fuzzy string match
  console.log(names);
  const scores = fuzzysort.go(query, names);
  console.log(scores);
  const foodName = scores[0] ? scores[0].target : "";

  // Get matching expiration data
  if (expirations.has(foodName)) {
    return expirations.get(foodName);
  }
  return undefined;
};

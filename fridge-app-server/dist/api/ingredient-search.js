"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientSearch = void 0;
const to_time_1 = __importDefault(require("to-time"));
const fuzzysort_1 = __importDefault(require("fuzzysort"));
// TODO: Fix CORS
const IngredientSearch = (query, number) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&metaInformation=true`, {
        method: "GET",
        headers: {
            "x-api-key": process.env.SPOONACULAR_API_KEY,
            "Access-Control-Allow-Origin": "*"
        }
    });
    // Sort r
    const resp = yield res.json();
    console.log(resp);
    return resp;
    const resultsSorted = SortIngredientResults(query, resp.results);
    return resultsSorted;
});
exports.IngredientSearch = IngredientSearch;
const SortIngredientResults = (query, results) => {
    const names = results.map(ing => ing.name);
    const scores = fuzzysort_1.default.go(query, names);
    let sorted = [];
    scores.forEach(obj => {
        sorted.push(results.find(result => result.name === obj.target));
    });
    return sorted;
};
const expirations = {
    "apple": {
        pantry: (0, to_time_1.default)("3d"),
        fridge: (0, to_time_1.default)("2w"),
        freezer: (0, to_time_1.default)("26w")
    }
};
// const allFoodNames = fuzzysort.prepare();
const GetIngredientExpirationData = (query) => {
    // Get all food names from expiration database
    const names = Object.keys(expirations);
    // Fuzzy string match
    const foodName = fuzzysort_1.default.go(query, names);
    // Get matching expiration data
};
//# sourceMappingURL=ingredient-search.js.map
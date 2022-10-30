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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientSearch = void 0;
const IngredientSearch = (query, number) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&metaInformation=true`, {
        method: "GET",
        headers: {
            "x-api-key": "7329d9703a144e7abd8e1bb9adedde37",
            "Access-Control-Allow-Origin": "*"
        }
    });
    const results = yield res.json();
    return results;
});
exports.IngredientSearch = IngredientSearch;
//# sourceMappingURL=ingredientSearch.js.map
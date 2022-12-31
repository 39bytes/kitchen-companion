import { Recipe, RecipeByIngredientResult } from "@backend/recipe";
import { ExpirationData, Ingredient } from "@backend/userfridge";
import axios from "axios";

const getFromAPI = async (endpoint: string, params: object) => {
  const res = await axios.get(process.env.REACT_APP_API_URL + endpoint, {
    params,
    withCredentials: true,
  });
  return res.data;
};

export const getIngredientSearch = async (query: string, number: number) => {
  return (await getFromAPI("ingredient/search", {
    query,
    number,
  })) as Ingredient[];
};

export const getIngredientExpiration = async (query: string) => {
  return (await getFromAPI("ingredient/expiration", {
    query,
  })) as ExpirationData;
};

export const getRecipesByIngredients = async (
  ingredients: Iterable<string>,
  number: number
) => {
  return (await getFromAPI("recipes/searchByIngredient", {
    ingredients: [...ingredients].join(),
    number,
  })) as RecipeByIngredientResult[];
};

export const getRecipeById = async (id: number) => {
  return (await getFromAPI(`recipes/searchById`, { id })) as Recipe;
};

// const LoadTop1kIngrdients = () => {
//     const data = fs.readFileSync("top-1k-ingredients.csv").toString().split('\n');

//     const top1kIngredients = data.map(x => {
//         const [name, id] = x.split(';');
//         return {name, id}
//     });

//     return top1kIngredients;
// }

// const Top1kIngredients = LoadTop1kIngrdients();

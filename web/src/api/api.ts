import { Recipe, RecipeByIngredientResult } from "./types/recipe";
import { ExpirationData, Ingredient } from "./types/userfridge";
import axios, { AxiosRequestConfig } from "axios";

// Wrapper for Axios requests to the backend API
export const client = {
  get: async (endpoint: string, config?: AxiosRequestConfig) => {
    const res = await axios.get(process.env.REACT_APP_API_URL + endpoint, {
      ...config,
      withCredentials: true,
    });
    return res;
  },
  post: async (
    endpoint: string,
    data?: object,
    config?: AxiosRequestConfig
  ) => {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + endpoint,
      data,
      {
        ...config,
        withCredentials: true,
      }
    );
    return res;
  },
};

export const getIngredientSearch = async (query: string, number: number) => {
  const res = await client.get("/api/ingredient/search", {
    params: {
      query,
      number,
    },
  });
  return res.data as Ingredient[];
};

export const getIngredientExpiration = async (query: string) => {
  const res = await client.get("/api/ingredient/expiration", {
    params: {
      query,
    },
  });
  return res.data as ExpirationData;
};

export const getRecipeById = async (id: number) => {
  const res = await client.get("/api/recipes/searchById", {
    params: {
      id,
    },
  });
  return res.data as Recipe;
};

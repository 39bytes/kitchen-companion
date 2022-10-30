export type Ingredient = {
    id: number;
    name: string;
    image: string;
    quantity: number;
    unit: string;
    possibleUnits: string[]
    category: string;
    //dateAdded: Date;
}

export type Category = {
    name: string;
    items: Ingredient[];
}

export type IngredientSearchResult = {
    id: number,
    name: string,
    image: string,
    aisle: string,
    possibleUnits: string[]
}

export type IngredientSearchResponse = {
    results: IngredientSearchResult[],
    offset: number,
    number: number,
    totalResults: number
}


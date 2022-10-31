export type Ingredient = {
    id: number;
    name: string;
    image: string;
    category: string;
    possibleUnits: string[];

    expirationData?: ExpirationData;
    quantity: number;
    unit: string;
    dateAdded: number;
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
    possibleUnits: string[],
}

export type ExpirationData = {
    pantry: number;
    fridge: number;
    freezer: number;
}


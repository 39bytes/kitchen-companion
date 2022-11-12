export interface Ingredient {
    id: number;
    name: string;
    image: string;
    category: string;
    possibleUnits: string[];

    expirationData?: ExpirationData;
    quantity: number;
    unit: string;
    dateAdded: number;
    section?: "pantry" | "fridge" | "freezer";
}

export interface Category {
    name: string;
    items: Ingredient[];
}

export interface ExpirationData {
    pantry: number;
    fridge: number;
    freezer: number;
}

export type IngredientSearchResult = {
    id: number,
    name: string,
    image: string,
    aisle: string,
    possibleUnits: string[],
}




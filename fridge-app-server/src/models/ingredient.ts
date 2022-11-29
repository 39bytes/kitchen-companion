export type FridgeSection = "pantry" | "fridge" | "freezer";

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
    section: FridgeSection;
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




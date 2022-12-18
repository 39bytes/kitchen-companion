import { FridgeIngredient } from "@backend/userfridge";

const expirationComparator = (a: FridgeIngredient, b: FridgeIngredient) => {
    if (!a.expirationData) return 1;
    if (!b.expirationData) return -1;

    const aTimeLeft = a.expirationData[a.section] - a.dateAdded;
    if (aTimeLeft < 0) return -1;

    const bTimeLeft = b.expirationData[b.section] - b.dateAdded;
    if (bTimeLeft < 0) return 1;

    if (aTimeLeft < bTimeLeft) return -1;
    if (aTimeLeft > bTimeLeft) return 1;
    return 0;
}

const nameComparator = (a: Ingredient, b: Ingredient) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

interface Ingredient {
    id: number;
    name: string;
    image: string;
    category: string;
    possibleUnits: string[];
    quantity: number;
    unit: string;
}

export const groupIngredientsBy = (
    items: FridgeIngredient[],
    key: "section" | "category",
    sortBy: "name" | "expiration" = "name"
) => {
    let sections = new Map<string, FridgeIngredient[]>();

    for (const ingredient of items) {
        let arr = sections.get(ingredient[key]);
        if (arr) {
            arr.push(ingredient);
        } else {
            sections.set(ingredient[key], [ingredient]);
        }
    }

    let comparator;
    switch (sortBy) {
        case "name":
            comparator = nameComparator;
            break;
        case "expiration":
            comparator = expirationComparator;
            break;
    }

    for (const arr of sections.values()) {
        arr.sort(comparator);
    }

    return sections;
};


export const groupIngredientsByCategory = (ingredients: Ingredient[]) => {
    let sections = new Map<string, Ingredient[]>();

    for (const ingredient of ingredients) {
        let arr = sections.get(ingredient.category);
        if (arr) {
            arr.push(ingredient);
        } else {
            sections.set(ingredient.category, [ingredient]);
        }
    }

    for (const arr of sections.values()) {
        arr.sort(nameComparator);
    }
}
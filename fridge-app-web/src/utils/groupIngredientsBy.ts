import { Ingredient } from "@backend/ingredient";

const sortIngredientByExpiration = (a: Ingredient, b: Ingredient) => {
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

const sortIngredientByName = (a: Ingredient, b: Ingredient) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

export const groupIngredientsBy = (
    contents: Ingredient[],
    key: "section" | "category",
    sortBy: "name" | "expiration" = "name"
) => {
    let sections = new Map<string, Ingredient[]>();

    for (const ingredient of contents) {
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
            comparator = sortIngredientByName;
            break;
        case "expiration":
            comparator = sortIngredientByExpiration;
            break;
    }

    for (const arr of sections.values()) {
        arr.sort(comparator);
    }

    return sections;
};
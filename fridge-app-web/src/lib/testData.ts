import { Ingredient } from "@backend/types/ingredient-types";

export const testData: Ingredient[] = [
    {
        id: 9003,
        name: "apple",
        image: "apple.jpg",
        quantity: 25,
        category: "pantry",
        unit: "g",
        possibleUnits: [
            "small",
            "large",
            "piece",
            "slice",
            "g",
            "extra small",
            "medium",
            "oz",
            "cup slice",
            "NLEA serving",
            "cup",
            "serving",
        ],
        dateAdded: Date.now()
    },
    {
        id: 11398,
        name: "tater tots",
        image: "tater-tots.jpg",
        quantity: 50,
        category: "pantry",
        unit: "g",
        possibleUnits: ["piece", "g", "bag", "oz", "cup"],
        dateAdded: Date.now()

    },
    {
        id: 11090,
        name: "broccoli",
        image: "broccoli.jpg",
        quantity: 36,
        category: "pantry",
        unit: "g",
        possibleUnits: [
            "g",
            "oz",
            "floret",
            "cup chopped",
            "serving",
            "head",
            "spear",
            "floweret",
            "piece",
            "stalk",
            "bunch",
            "NLEA serving",
            "cup",
            "crown",
        ],
        dateAdded: Date.now()
    },
];

type ExpirationData = Record<number, { frozen: number, fridge: number, pantry: number }>

export const expirationTimes: ExpirationData = {
    9003: { "frozen": 12323, "fridge": 123123, "pantry": 123123 },
    11090: { "frozen": 123123, "fridge": 123123, "pantry": 123123 },
}

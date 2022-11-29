import { FridgeSection } from "@backend/ingredient";

export const isFridgeSection = (str: string): str is FridgeSection => {
    return str === "pantry" || str === "fridge" || str === "freezer";
}
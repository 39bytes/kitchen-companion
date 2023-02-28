import { FridgeSection } from "../api/types/userfridge";

export const isFridgeSection = (str: string): str is FridgeSection => {
  return str === "pantry" || str === "fridge" || str === "freezer";
};

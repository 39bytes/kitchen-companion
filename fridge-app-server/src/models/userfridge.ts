import mongoose, { Schema, Types } from 'mongoose';
export type FridgeSection = "pantry" | "fridge" | "freezer";

export interface FridgeIngredient {
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

const ExpirationDataSchema = new Schema({
    pantry: Number,
    fridge: Number,
    freezer: Number
})

const IngredientSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    possibleUnits: [String],
    expirationData: ExpirationDataSchema,
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    dateAdded: Number,
    section: { type: String, required: true }
});

//export type FridgeContents = Map<string, Ingredient[]>;

export interface UserFridgeDocument {
    userId: Types.ObjectId,
    contents: FridgeIngredient[]
}

const UserFridgeSchema = new Schema<UserFridgeDocument>({
    userId: Schema.Types.ObjectId,
    contents: { type: [IngredientSchema], required: true }
});

const userFridgeModel = mongoose.model<UserFridgeDocument>("UserFridge", UserFridgeSchema, "user_fridge");
export default userFridgeModel;
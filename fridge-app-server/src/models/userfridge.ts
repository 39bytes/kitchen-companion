import mongoose, { Schema, Types } from 'mongoose';

const ExpirationDataSchema = new Schema({
    pantry: Number,
    fridge: Number,
    freezer: Number
})

const IngredientSchema = new Schema({
    ingredientId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    possibleUnits: [String],
    expirationData: ExpirationDataSchema,
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    dateAdded: Number,
    section: String,
});

const CategorySchema = new Schema({
    name: { type: String, required: true },
    items: [IngredientSchema],
});

type Ingredient = {
    id: number;
    name: string;
    image: string;
    category: string;
    possibleUnits: string[];

    expirationData?: ExpirationData;
    quantity: number;
    unit: string;
    dateAdded: number;
    section: "pantry" | "fridge" | "freezer"
}

type Category = {
    name: string;
    items: Ingredient[];
}

type ExpirationData = {
    pantry: number;
    fridge: number;
    freezer: number;
}

export interface UserFridgeDocument {
    userId: Types.ObjectId,
    pantryContents: Category[];
    fridgeContents: Category[];
    freezerContents: Category[];
}

const UserFridgeSchema = new Schema<UserFridgeDocument>({
    userId: Schema.Types.ObjectId,
    pantryContents: [CategorySchema],
    fridgeContents: [CategorySchema],
    freezerContents: [CategorySchema],
});

const userFridgeModel = mongoose.model<UserFridgeDocument>("UserFridge", UserFridgeSchema, "user_fridge");
export default userFridgeModel;
import mongoose, { Schema, Types } from 'mongoose';
import { Ingredient } from './ingredient';

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
    contents: Ingredient[]
}

const UserFridgeSchema = new Schema<UserFridgeDocument>({
    userId: Schema.Types.ObjectId,
    contents: { type: [IngredientSchema], required: true }
});

const userFridgeModel = mongoose.model<UserFridgeDocument>("UserFridge", UserFridgeSchema, "user_fridge");
export default userFridgeModel;
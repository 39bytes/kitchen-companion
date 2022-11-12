import mongoose, { Schema, Types } from 'mongoose';
import { Ingredient, Category } from './ingredient';

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
    section: { type: String, required: true }
});

const CategorySchema = new Schema({
    name: { type: String, required: true },
    items: [IngredientSchema],
});

export interface UserFridgeDocument {
    userId: Types.ObjectId,
    contents: Category[];
}

const UserFridgeSchema = new Schema<UserFridgeDocument>({
    userId: Schema.Types.ObjectId,
    contents: [CategorySchema],
});

const userFridgeModel = mongoose.model<UserFridgeDocument>("UserFridge", UserFridgeSchema, "user_fridge");
export default userFridgeModel;
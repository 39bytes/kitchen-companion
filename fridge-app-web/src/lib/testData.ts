import { FridgeIngredient } from "@backend/userfridge";

//import { FridgeItem } from "@backend/userfridge";
// export const dummyData: FridgeIngredient[] = [
//   {
//     id: 9040,
//     name: "banana",
//     image: "bananas.jpg",
//     aisle: "Produce",
//     possibleUnits: ["g", "oz", "large", "small", "slice", "piece", "cup"],
//     expirationData: {
//       pantry: 259200000,
//       fridge: 1209600000,
//       freezer: 15552000000,
//     },
//     quantity: 20,
//     unit: "large",
//     dateAdded: 1670298786468,
//     section: "pantry",
//   },
//   {
//     id: 19095,
//     name: "vanilla ice cream",
//     image: "vanilla-ice-cream.png",
//     aisle: "Frozen",
//     possibleUnits: ["g", "oz", "cup"],
//     expirationData: {
//       pantry: -1,
//       fridge: -1,
//       freezer: -1,
//     },
//     quantity: 500,
//     unit: "g",
//     dateAdded: 1670300344224,
//     section: "freezer",
//   },
//   {
//     id: 99223,
//     name: "canned chipotle chile",
//     image: "canned-chipotle.png",
//     aisle: "Canned and Jarred",
//     possibleUnits: ["g", "oz", "piece"],
//     expirationData: {
//       pantry: -1,
//       fridge: -1,
//       freezer: -1,
//     },
//     quantity: 20,
//     unit: "oz",
//     dateAdded: 1670300363802,
//     section: "fridge",
//   },
//   {
//     id: 9003,
//     name: "apple",
//     image: "apple.jpg",
//     aisle: "Produce",
//     possibleUnits: ["g", "oz", "large", "small", "slice", "piece", "cup"],
//     expirationData: {
//       pantry: 432000000,
//       fridge: 1814400000,
//       freezer: 15552000000,
//     },
//     quantity: 6,
//     unit: "large",
//     dateAdded: 1670300432631,
//     section: "fridge",
//   },
//   {
//     id: 11352,
//     name: "potato",
//     image: "potatoes-yukon-gold.png",
//     aisle: "Produce",
//     possibleUnits: ["g", "oz", "large", "small", "piece", "cup"],
//     expirationData: {
//       pantry: -1,
//       fridge: -1,
//       freezer: -1,
//     },
//     quantity: 10,
//     unit: "large",
//     dateAdded: 1670302383081,
//     section: "pantry",
//   },
//   {
//     id: 5062,
//     name: "chicken breast",
//     image: "chicken-breasts.png",
//     aisle: "Meat",
//     possibleUnits: ["g", "oz", "piece", "cup"],
//     expirationData: {
//       pantry: 172800000,
//       fridge: 1814400000,
//       freezer: 15552000000,
//     },
//     quantity: 4,
//     unit: "piece",
//     dateAdded: 1670376400954,
//     section: "freezer",
//   },
//   {
//     id: 11206,
//     name: "cucumber",
//     image: "cucumber.jpg",
//     aisle: "Produce",
//     possibleUnits: ["g", "oz", "large", "small", "slice", "piece", "cup"],
//     expirationData: {
//       pantry: -1,
//       fridge: -1,
//       freezer: -1,
//     },
//     quantity: 5,
//     unit: "large",
//     dateAdded: 1671325393235,
//     section: "fridge",
//   },
// ];

type ExpirationData = Record<
  number,
  { frozen: number; fridge: number; pantry: number }
>;

export const expirationTimes: ExpirationData = {
  9003: { frozen: 12323, fridge: 123123, pantry: 123123 },
  11090: { frozen: 123123, fridge: 123123, pantry: 123123 },
};

export {};
// import { Refresh } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   Fade,
//   FormControl,
//   SelectChangeEvent,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { CenteredSpinner } from "src/components/CenteredSpinner";
// import Layout from "src/components/layouts/layout/Layout";
// import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
// import { RecipeCard } from "../recipes/RecipeCard";
// import { RecipeInfoDialog } from "../recipes/RecipeInfoDialog";
// import { selectRecipeInfoById } from "./recipeInfoSlice";
// import {
//   fetchRecommendations,
//   selectAllRecipeRecommendations,
// } from "./recommendationsSlice";

// const RecipeRecommendations = () => {
//   const [selectedRecipeId, setSelectedRecipeId] = useState<number>();
//   const [recipeInfoOpen, setRecipeInfoOpen] = useState(false);

//   const [recipeType, setRecipeType] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const recommendations = useAppSelector(selectAllRecipeRecommendations);
//   const recsStatus = useAppSelector((state) => state.recommendations.status);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (recsStatus === "idle") {
//       dispatch(fetchRecommendations());
//     }
//   }, [recsStatus, dispatch]);

//   const handleRecommendationCardClick = async (recipeId: number) => {
//     setSelectedRecipeId(recipeId);
//     setRecipeInfoOpen(true);
//   };
//   const handleRecipeInfoDialogClose = () => {
//     setRecipeInfoOpen(false);
//   };

//   let recommendationsList;

//   if (recsStatus === "loading") {
//     recommendationsList = <CenteredSpinner />;
//   } else {
//     recommendationsList = (
//       <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
//         {recommendations.map((rec) => (
//           <RecipeCard
//             key={rec.title}
//             recipe={rec}
//             handleClick={handleRecommendationCardClick}
//           />
//         ))}
//       </Box>
//     );
//   }

//   const recipeInfoDialog = selectedRecipeId ? (
//     <RecipeInfoDialog
//       open={recipeInfoOpen}
//       recipeId={selectedRecipeId}
//       onClose={handleRecipeInfoDialogClose}
//       recipeInfoSelector={selectRecipeInfoById}
//     />
//   ) : (
//     <></>
//   );

//   const handleRecipeTypeChange = (e: SelectChangeEvent) => {
//     setRecipeType(e.target.value);
//   };

//   const handleSearchQueryChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleRefreshButtonClick = () => {
//     dispatch(fetchRecommendations());
//   };

//   return (
//     <Layout>
//       <Fade in={true} timeout={500}>
//         <Box>
//           <FormControl variant="standard">
//             <Box display="flex">
//               {/* <InputLabel id="recipe-type-label">Recipe Type</InputLabel>
//               <Select
//                 labelId="recipe-type-label"
//                 value={recipeType}
//                 label="Recipe Type"
//                 onChange={handleRecipeTypeChange}
//                 sx={{ width: 200, mr: 2 }}
//               >
//                 <MenuItem value="main course">Main Course</MenuItem>
//                 <MenuItem value="side dish">Side Dish</MenuItem>
//                 <MenuItem value="dessert">Dessert</MenuItem>
//                 <MenuItem value="appetizer">Appetizer</MenuItem>
//                 <MenuItem value="salad">Salad</MenuItem>
//                 <MenuItem value="bread">Bread</MenuItem>
//                 <MenuItem value="breakfast">Breakfast</MenuItem>
//                 <MenuItem value="soup">Soup</MenuItem>
//                 <MenuItem value="beverage">Beverage</MenuItem>
//                 <MenuItem value="sauce">Sauce</MenuItem>
//                 <MenuItem value="fingerfood">Finger Food</MenuItem>
//                 <MenuItem value="snack">Snack</MenuItem>
//                 <MenuItem value="drink">Drink</MenuItem>
//               </Select>

//               <TextField
//                 InputProps={{
//                   startAdornment: <Search color="secondary" sx={{ mr: 1 }} />,
//                 }}
//                 label="Search for a specific kind of recipe (ex: pasta)"
//                 value={searchQuery}
//                 onChange={handleSearchQueryChange}
//                 variant="standard"
//                 fullWidth
//               /> */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="small"
//                 onClick={handleRefreshButtonClick}
//               >
//                 <Refresh sx={{ mr: 1 }} />
//                 Refresh
//               </Button>
//             </Box>
//           </FormControl>
//           {recommendationsList}
//         </Box>
//       </Fade>
//       {recipeInfoDialog}
//     </Layout>
//   );
// };

// export default RecipeRecommendations;

export type SingleRecipeParams = {
  recipeId: string;
};

export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  SingleRecipe: SingleRecipeParams;
};

export type StackParamList = {
  Home: undefined;
  SavedRecipes: undefined;
  CreateRecipe: undefined;
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
  SingleRecipe: SingleRecipeParams;
};

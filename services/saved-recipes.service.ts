import axiosWithAuth from "@/api/interceptors/auth.interceptor";
import { ISavedRecipesResponse } from "@/types/saved-recipes.type";

class SavedRecipeService {
  private BASE_URL = "/saved-recipes";

  async getByUserId() {
    const response = await axiosWithAuth.get<ISavedRecipesResponse>(
      this.BASE_URL
    );
    return response.data;
  }

  async toggle(recipeId: string) {
    const response = await axiosWithAuth.post<ISavedRecipesResponse>(
      this.BASE_URL,
      { recipeId }
    );
    return response.data;
  }
}

export const savedRecipeService = new SavedRecipeService();

import axiosClassic from "@/api/interceptors";
import { IRecipeResponse } from "@/types/recipe.type";

class RecipeService {
  private BASE_URL = "/recipes";

  async getAll() {
    const response = await axiosClassic.get<IRecipeResponse[]>(this.BASE_URL);
    return response.data;
  }

  async getById(recipeId: string) {
    const response = await axiosClassic.get<IRecipeResponse>(
      `${this.BASE_URL}/${recipeId}`
    );
    return response.data;
  }
}

export const recipeService = new RecipeService();

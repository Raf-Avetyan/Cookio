import { IBase } from "./root.types";

export interface ISavedRecipesResponse extends IBase {
  userId: string;
  user: {
    username: string;
    avatarPath: string;
  };
  recipes: {
    id: string;
    recipe: {
      id: string;
      name: string;
      description: string;
      imageUrl?: string;
      videoUrl?: string;
      createdAt: string;
      updatedAt: string;
      time: string;
      category: { name: string };
      comments: { content: string; userId: string }[];
      ingredients: { name: string; quantity: string }[];
      steps: { number: number; content: string }[];
      tags: string[];
    };
  }[];
}

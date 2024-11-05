import { IBase } from "./root.types";

export interface IRecipeResponse extends IBase {
  name: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  time: string;
  category?: { name: string };
  comments?: { content: string; userId: string }[];
  ingredients: { name: string; quantity: string }[];
  steps: { number: string; content: string }[];
  tags: string[];
}

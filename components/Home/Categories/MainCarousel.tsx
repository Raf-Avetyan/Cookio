import { Colors } from "@/constants/Colors";
import * as React from "react";
import { Image } from "react-native";
import { Pressable, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import SaveIcon from "../../../assets/icons/save2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recipeService } from "@/services/recipes.service";
import { savedRecipeService } from "@/services/saved-recipes.service";
import { toast } from "sonner-native";

interface IMainCarousel {
  selectedCategory: string;
}

function MainCarousel({ selectedCategory }: IMainCarousel) {
  const queryClient = useQueryClient();

  const { data: recipes, isLoading: recipesIsLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => recipeService.getAll(),
  });

  const { data: savedRecipes } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: () => savedRecipeService.getByUserId(),
  });

  const { mutate } = useMutation({
    mutationKey: ["toggleSavedRecipe"],
    mutationFn: ({ recipeId }: { recipeId: string }) =>
      savedRecipeService.toggle(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
    },
  });

  const ref = React.useRef<ICarouselInstance>(null);
  const [isFoodFromCategory, setIsFoodFromCategory] = React.useState(true);

  const filteredData = React.useMemo(() => {
    if (recipes?.length) {
      const filtered = recipes.filter(
        (item) => item.category.name === selectedCategory
      );

      if (filtered.length) {
        setIsFoodFromCategory(true);
        return filtered;
      } else {
        setIsFoodFromCategory(false);
        return [];
      }
    }
  }, [recipes, selectedCategory]);

  const baseOptions = {
    vertical: false,
    width: 190,
    height: 230,
  } as const;

  const handleSaveRecipe = (recipeId: string) => {
    const isAlreadySaved = savedRecipes?.recipes?.some(
      (recipes) => recipes.recipe.id === recipeId
    );

    if (isAlreadySaved) {
      toast.success("Recipe removed from saved");
    } else {
      toast.success("Recipe successfully added to saved");
    }

    mutate({ recipeId });
  };

  const handleIsSaveIconFill = (recipeId: string) => {
    if (savedRecipes?.recipes) {
      const isAlreadySaved = savedRecipes.recipes.some(
        (recipes) => recipes.recipe.id === recipeId
      );

      return isAlreadySaved ? "gold" : `${Colors.bgColor}`;
    }
  };

  return (
    <View style={{ flex: 1, marginTop: !isFoodFromCategory ? 10 : 75 }}>
      {isFoodFromCategory && !recipesIsLoading ? (
        <Carousel
          {...baseOptions}
          loop={false}
          ref={ref}
          style={{
            overflow: "visible",
          }}
          data={filteredData}
          renderItem={({ item }) => (
            <Pressable
              style={{
                backgroundColor: "#333",
                marginRight: 16,
                borderRadius: 12,
                minHeight: 170,
                paddingHorizontal: 12,
                paddingVertical: 15,
                width: 170,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -70,
                  alignSelf: "center",
                  width: 140,
                  height: 140,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item?.imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View
                style={{
                  marginTop: 65,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 14,
                    textAlign: "center",
                    color: "whitesmoke",
                  }}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item?.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: 18,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "PoppinsRegular",
                      fontSize: 12,
                      color: Colors.Neutral[40],
                    }}
                  >
                    Time
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 12,
                      color: "whitesmoke",
                    }}
                  >
                    {item?.time}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 24,
                    width: 30,
                    height: 30,
                    backgroundColor: "#555",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => handleSaveRecipe(item.id)}
                >
                  <SaveIcon
                    fill={handleIsSaveIconFill(item.id)}
                    height={20}
                    width={20}
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 16,
              color: Colors.Primary[50],
              textAlign: "center",
            }}
          >
            No foods found for this category.
          </Text>
        </View>
      )}
    </View>
  );
}

export default MainCarousel;

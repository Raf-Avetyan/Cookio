import { Colors } from "@/constants/Colors";
import * as React from "react";
import { Pressable, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

interface ICategoriesCarousel {
  selectedCategory: string;
  setsSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

function CategoriesCarousel({
  selectedCategory,
  setsSelectedCategory,
}: ICategoriesCarousel) {
  const [data, setData] = React.useState([
    { name: "Salad" },
    { name: "Breakfast" },
    { name: "Appetizer" },
    { name: "Noodle" },
    { name: "Lunch" },
    { name: "Meat" },
    { name: "Vegetables" },
  ]);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: 130,
    height: 50,
  } as const;

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{
          width: "100%",
        }}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setsSelectedCategory(item.name)}
            style={{
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor:
                item.name == selectedCategory
                  ? Colors.Primary[50]
                  : "whitesmoke",
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsBold",
                fontSize: 12,
                color:
                  item.name == selectedCategory
                    ? Colors.bgColor
                    : Colors.Primary[40],
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

export default CategoriesCarousel;

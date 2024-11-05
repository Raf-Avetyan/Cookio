import { Colors } from "@/constants/Colors";
import * as React from "react";
import { Image, Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

interface IRecentRecipesCarousel {}

function RecentRecipesCarousel({}: IRecentRecipesCarousel) {
  const [data, setData] = React.useState([
    {
      title: "Indonesian chicken burger",
      image: require("../../../assets/images/RecentRecipes/food01.jpg"),
      creator: "Adrianna Curl",
    },
    {
      title: "Home made cute pancake",
      image: require("../../../assets/images/RecentRecipes/food02.jpg"),
      creator: "James Wolden",
    },
    {
      title: "How to make seafood fried",
      image: require("../../../assets/images/RecentRecipes/food03.jpg"),
      creator: "Roberta Anny",
    },
    {
      title: "Indonesian chicken burger",
      image: require("../../../assets/images/RecentRecipes/food01.jpg"),
      creator: "Adrianna Curl",
    },
    {
      title: "Home made cute pancake",
      image: require("../../../assets/images/RecentRecipes/food02.jpg"),
      creator: "James Wolden",
    },
    {
      title: "How to make seafood fried",
      image: require("../../../assets/images/RecentRecipes/food03.jpg"),
      creator: "Roberta Anny",
    },
  ]);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: 140,
  } as const;

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{
          width: "100%",
          minHeight: 210,
        }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              borderRadius: 10,
              maxWidth: 125,
              flex: 1,
            }}
          >
            <View style={{ width: 125, height: 125 }}>
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "PoppinsBold",
                fontSize: 14,
                color: "whitesmoke",
                marginTop: 8,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: "PoppinsRegular",
                fontSize: 10,
                color: Colors.Neutral[40],
                marginTop: 4,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              By {item.creator}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default RecentRecipesCarousel;

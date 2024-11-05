import * as React from "react";
import { Text, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

import TrendingVideo from "./TrendingVideo";
import { window } from "../../constants";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/types/navigation.types";

const PAGE_WIDTH = window.width;

function TrendingCarousel({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "SingleRecipe">;
}) {
  const [data, setData] = React.useState([...new Array(6).keys()]);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <Carousel
        {...baseOptions}
        loop={true}
        ref={ref}
        style={{
          width: "100%",
          flex: 1,
        }}
        autoPlayInterval={4000}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              marginRight: 16,
            }}
          >
            <TrendingVideo
              navigation={navigation}
              recipeId={"cm27p0zz80000d0tykmnahhzb"}
              moreContent
            />
          </View>
        )}
      />
    </View>
  );
}

export default TrendingCarousel;

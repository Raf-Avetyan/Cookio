import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  VideoFullscreenUpdate,
} from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon, Slider } from "react-native-elements";
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import MoreSvg from "../../assets/icons/more.svg";
import FullscreenIcon from "../../assets/icons/fullscreen.svg";
import { Colors } from "@/constants/Colors";
import * as ScreenOrientation from "expo-screen-orientation";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import {
  RootStackParamList,
  SingleRecipeParams,
} from "@/types/navigation.types";

interface ITrendingVideo {
  videoUrl?: string;
  imageUrl?: string;
  user?: { username: string; avatarPath: string };
  title?: string;
  recipeId?: string;
  navigation?: NativeStackNavigationProp<RootStackParamList, "SingleRecipe">;
  moreContent?: boolean;
}

export const TrendingVideo = ({
  imageUrl,
  videoUrl,
  user,
  recipeId,
  title,
  navigation,
  moreContent = false,
}: ITrendingVideo) => {
  const video = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isControlsLoading, setIsControlsLoading] = useState(false);
  const [isControlsHided, setisControlsHided] = useState(false);

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const [resizeMode, setResizeMode] = useState<ResizeMode>(ResizeMode.COVER);
  const [isFullScreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setisControlsHided(true);
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isPlaying, isControlsHided]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handlePress = async () => {
    if (!showVideo) {
      setShowVideo(true);
      setIsLoading(true);
      video.current?.playAsync();
    } else {
      if (isPlaying) {
        await video.current?.pauseAsync();
      } else {
        await video.current?.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setIsLoading(false);
    }
  };

  function handlePlaybackStatusUpdate(e: any) {
    if (showVideo) {
      if (e.isPlaying && !isPlaying) {
        setIsPlaying(true);
      }

      if (!e.isPlaying && isPlaying) {
        setIsPlaying(false);
      }

      setPosition(e.positionMillis);

      if (duration === 0) {
        setDuration(e.durationMillis);
      }
    }
  }

  async function skip(bool: boolean) {
    setIsControlsLoading(true);
    if (video.current) {
      const status = await video.current.getStatusAsync();

      if (status.isLoaded) {
        const curPos = status.positionMillis;

        const tenSeconds = 10000;

        const newPos = bool ? curPos + tenSeconds : curPos - tenSeconds;

        setPosition(newPos);
        video.current.setPositionAsync(newPos);
      }
    }
    setIsControlsLoading(false);
  }

  async function handleDoneSliding(value: number) {
    setIsControlsLoading(true);
    await video?.current?.setPositionAsync(value);
    setIsControlsLoading(false);
  }

  const handleVideoPress = () => {
    setisControlsHided(!isControlsHided);
  };

  const handleFullscreen = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    video.current?.presentFullscreenPlayer();
  };

  const handleFullscreenUpdate = async ({
    fullscreenUpdate,
  }: {
    fullscreenUpdate: any;
  }) => {
    if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
      setIsFullscreen(true);
      setResizeMode(ResizeMode.CONTAIN);
    } else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
      setIsFullscreen(false);
      setResizeMode(ResizeMode.COVER);
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  return (
    <View
      style={{
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View style={styles.container}>
        <View style={{ display: !showVideo ? "flex" : "none" }}>
          <Image
            style={styles.image}
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../../assets/images/appIcon.jpg")
            }
          />
          <View style={styles.videoDuration}>
            <Text style={styles.durationText}>{formatTime(duration)}</Text>
          </View>
        </View>
        <Pressable style={styles.videoContainer} onPress={handleVideoPress}>
          {isLoading && (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color={Colors.Primary[50]}
            />
          )}
          <Video
            ref={video}
            style={[
              styles.video,
              {
                width: showVideo ? "100%" : null,
                height: showVideo ? "100%" : null,
              },
            ]}
            source={
              videoUrl
                ? { uri: videoUrl }
                : require("../../assets/videos/video01.mp4")
            }
            useNativeControls={false}
            resizeMode={resizeMode}
            isLooping
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            onLoad={handleVideoLoad}
            onFullscreenUpdate={handleFullscreenUpdate}
          />
        </Pressable>
        {!isControlsHided ? (
          <View style={styles.buttonsContainer}>
            {showVideo ? (
              <TouchableOpacity
                style={styles.xsButton}
                onPress={() => skip(false)}
              >
                <View style={styles.icon}>
                  <Icon name="replay-10" size={30} color={"white"} />
                </View>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <View style={styles.icon}>
                {isControlsLoading ? (
                  <ActivityIndicator size="large" color={Colors.bgColor} />
                ) : !isPlaying ? (
                  <PlayIcon width={18} height={18} />
                ) : (
                  <PauseIcon width={25} height={25} />
                )}
              </View>
            </TouchableOpacity>
            {showVideo ? (
              <TouchableOpacity
                style={styles.xsButton}
                onPress={() => skip(true)}
              >
                <View style={styles.icon}>
                  <Icon name="forward-10" size={30} color={"white"} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {isPlaying || (!isPlaying && showVideo) ? (
          !isControlsHided ? (
            <React.Fragment>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  bottom: -12,
                  width: "96%",
                  marginLeft: 5,
                  gap: 6,
                }}
              >
                <Slider
                  value={position}
                  maximumValue={duration}
                  onValueChange={(value) => setPosition(value)}
                  onSlidingStart={async () => {
                    if (isPlaying) {
                      await video.current?.pauseAsync();
                      setIsPlaying(false);
                    }
                  }}
                  onSlidingComplete={async (value) => {
                    await handleDoneSliding(value);
                    if (isPlaying) {
                      await video.current?.playAsync();
                      setIsPlaying(true);
                    }
                  }}
                  thumbStyle={{ width: 12, height: 12 }}
                  style={{
                    flex: 1,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  position: "absolute",
                  bottom: 16,
                  paddingRight: 9,
                  paddingLeft: 6,
                  width: "100%",
                  alignItems: "flex-end",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(48, 48, 48, 0.6)",
                    borderRadius: 5,
                    paddingHorizontal: 6,
                    paddingTop: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 10,
                      color: Colors.bgColor,
                    }}
                  >
                    {formatTime(position)}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(48, 48, 48, 0.6)",
                      borderRadius: 5,
                      paddingHorizontal: 6,
                      paddingTop: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 10,
                        color: Colors.bgColor,
                      }}
                    >
                      {formatTime(duration)}
                    </Text>
                  </View>
                  <Pressable
                    onPress={handleFullscreen}
                    style={{ marginBottom: 2 }}
                  >
                    <FullscreenIcon width={17} height={17} />
                  </Pressable>
                </View>
              </View>
            </React.Fragment>
          ) : null
        ) : null}
      </View>
      {moreContent && (
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SingleRecipe", { recipeId })}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 12,
                flexDirection: "row",
              }}
            >
              <Text style={styles.title}>
                {title ? title : "How to make sushi at home"}
              </Text>
              <MoreSvg width={24} height={24} />
            </View>
            {/* {user ? ( */}
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Image
                source={
                  user?.avatarPath
                    ? { uri: user.avatarPath }
                    : require("../../assets/icons/user01.jpg")
                }
                style={{ width: 32, height: 32, borderRadius: 16 }}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: "PoppinsRegular",
                  fontSize: 12,
                  color: Colors.Neutral[40],
                }}
              >
                {user?.username ? user.username : "By Niki Samantha"}
              </Text>
            </View>
          </TouchableOpacity>
          {/* ) : null} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 210,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.1)",
    width: "100%",
  },
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(48, 48, 48, 0.05)",
    position: "relative",
  },
  videoDuration: {
    position: "absolute",
    right: 6,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#353535af",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    paddingTop: 3.5,
    height: 26,
  },
  durationText: {
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: Colors.bgColor,
  },
  video: {},
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    position: "absolute",
    bottom: 78,
    left: "50%",
    transform: [{ translateX: -27 }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(48, 48, 48, 0.6)",
  },
  xsButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    position: "absolute",
    bottom: 76,
    left: "50%",
    transform: [{ translateX: -27 }],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(48, 48, 48, 0.6)",
    marginLeft: 6,
    marginBottom: 5,
  },
  icon: {
    paddingLeft: 1,
  },
  loader: {
    position: "absolute",
    transform: [{ translateX: -1 }],
  },
  bottom: {
    display: "flex",
    gap: 2,
  },
  title: {
    fontFamily: "PoppinsSemibold",
    fontSize: 16,
    color: Colors.text,
  },
});

export default TrendingVideo;

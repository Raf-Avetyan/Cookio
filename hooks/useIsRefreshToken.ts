import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useIsRefreshToken = () => {
  const [isRefreshToken, setIsRefreshToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (refreshToken) {
          setIsRefreshToken(true);
        }
      } catch (error) {
        console.error("Error getting refresh token", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRefreshToken();
  }, []);

  return { isRefreshToken, isLoading };
};

export default useIsRefreshToken;

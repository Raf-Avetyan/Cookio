import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode as jwtD } from "jwt-decode";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const saveTokenStorage = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error("Error saving tokens", error);
  }
};

const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtD(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token", error);
    return true;
  }
};

export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token && !isTokenExpired(token)) {
      return token;
    }

    return null;
  } catch (error) {
    console.error("Error getting access token", error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting refresh token", error);
    return null;
  }
};

export const removeFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error removing tokens", error);
  }
};

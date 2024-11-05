import { getRefreshToken, saveTokenStorage } from "./auth-token.service";
import axiosClassic from "@/api/interceptors";

export const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    console.error("No refresh token available");
    return null;
  }

  try {
    const response = await axiosClassic.post("/auth/signin/access-token", {
      refreshToken,
    });

    console.log(response.data);

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    await saveTokenStorage(accessToken, newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return null;
  }
};

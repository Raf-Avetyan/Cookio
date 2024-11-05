import axios from "axios";
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage,
} from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import { Href, useRouter } from "expo-router";

const axiosWithAuth = axios.create({
  baseURL: "http://192.168.124.140:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const router = useRouter();

axiosWithAuth.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await authService.getNewTokens();
        await saveTokenStorage(response.accessToken, response.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        removeFromStorage();
        router.replace("/(auth)/auth" as Href<string | object>);
      }
    }

    throw error;
  }
);

export default axiosWithAuth;

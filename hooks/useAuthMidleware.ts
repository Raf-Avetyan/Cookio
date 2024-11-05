import { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import { useNavigationState } from "@react-navigation/native";
import {
  getAccessToken,
  getRefreshToken,
  removeFromStorage,
} from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";

export const useAuthMiddleware = () => {
  const router = useRouter();
  const routeName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken) {
          if (routeName === "auth") {
            router.replace("/(root)/(tabs)/");
          }
          return;
        } else {
          const refreshToken = await getRefreshToken();

          if (refreshToken) {
            try {
              const newTokens = await authService.getNewTokens();

              if (newTokens.accessToken) {
                if (routeName === "auth") {
                  router.replace("/(root)/(tabs)/");
                }
              }
            } catch (error) {
              await removeFromStorage();
              router.replace("/(auth)/auth" as Href<string | object>);
            }
          } else {
            if (routeName !== "auth") {
              await removeFromStorage();
              router.replace("/(auth)/auth" as Href<string | object>);
            }
          }
        }
      } catch (error) {
        console.error("Error checking authentication", error);
      }
    };

    checkAuth();
  }, [routeName]);
};

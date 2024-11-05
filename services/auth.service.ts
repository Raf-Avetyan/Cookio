import {
  saveTokenStorage,
  getRefreshToken,
  removeFromStorage,
} from "./auth-token.service";
import { IAuthResponse, ISigninForm, ISignupForm } from "@/types/auth.types";
import axiosClassic from "@/api/interceptors";

export const authService = {
  async main(type: "signin" | "signup", data: ISigninForm | ISignupForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/${type}`,
      data
    );

    if (response.data.accessToken && response.data.refreshToken) {
      await saveTokenStorage(
        response.data.accessToken,
        response.data.refreshToken
      );
    }

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axiosClassic.post<IAuthResponse>(
      "/auth/signin/access-token",
      { refreshToken }
    );

    if (response.data.accessToken && response.data.refreshToken) {
      await saveTokenStorage(
        response.data.accessToken,
        response.data.refreshToken
      );
    }

    return response.data;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/auth/logout");

    if (response.data) {
      await removeFromStorage();
    }

    return response.data;
  },
};

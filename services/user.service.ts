import axiosWithAuth from "@/api/interceptors/auth.interceptor";
import { IUser, TypeUserForm } from "@/types/auth.types";

class UserService {
  private BASE_URL = "/user/profile";

  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(this.BASE_URL);
    return response.data;
  }

  async updateProfile(data: TypeUserForm) {
    const response = await axiosWithAuth.put<IUser>(this.BASE_URL, data);
    return response.data;
  }
}

export const userService = new UserService();

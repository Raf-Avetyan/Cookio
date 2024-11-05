// import axiosWithAuth from "@/api/interceptors/auth.interceptor";
// import { IUser } from "@/types/auth.types";

// class UploadService {
//   private BASE_URL = "/uploads";

//   async uploadAvatar(data: FormData) {
//     const response = await axiosWithAuth.post<IUser>(
//       `${this.BASE_URL}/avatar`,
//       data,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   }
// }

// export const uploadService = new UploadService();

import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IVerificationEmail,
  IRegister,
  ILogin,
  IUpdateProfile,
  IUpdatePassword,
  IResetPassword,
  IVerificationOTP,
  IRegisterCompany,
} from "@/types/Auth";

const authServices = {
  login: async (body: ILogin) =>
    instance.post(`${endpoint.AUTH}/login`, body, {
      withCredentials: true,
    }),
  register: async (body: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, body),
  registerCompany: async (body: IRegisterCompany) =>
    instance.post(`${endpoint.AUTH}/register/company`, body),
  verificationEmail: async (body: IVerificationEmail) =>
    instance.post(`${endpoint.AUTH}/verify/email`, body),
  refreshToken: async (refreshToken: string) =>
    instance.get(`${endpoint.AUTH}/refresh`, {
      headers: {
        "refresh-token": refreshToken,
      },
    }),
  logout: async () => instance.post(`${endpoint.AUTH}/logout`),
  getProfile: async () => instance.get(`${endpoint.AUTH}/me`),
  updateProfile: async (payload: IUpdateProfile) =>
    instance.put(`${endpoint.AUTH}/me/update`, payload),
  updatePassword: async (payload: IUpdatePassword) =>
    instance.put(`${endpoint.AUTH}/password/update`, payload),
  forgotPassword: async (payload: { email: string }) =>
    instance.post(`${endpoint.AUTH}/password/forgot`, payload),
  resetPassword: async (payload: IResetPassword) =>
    instance.post(`${endpoint.AUTH}/password/reset`, payload),
};

export default authServices;

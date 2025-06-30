import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVerificationEmail, IRegister, ILogin } from "@/types/Auth";

const authServices = {
  login: async (body: ILogin) =>
    instance.post(`${endpoint.AUTH}/login`, body, {
      withCredentials: true,
    }),
  register: async (body: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, body),
  verificationEmail: async (body: IVerificationEmail) =>
    instance.post(`${endpoint.AUTH}/verify/email`, body),
  refreshToken: async (refreshToken: string) =>
    instance.get(`${endpoint.AUTH}/refresh`, {
      headers: {
        "refresh-token": refreshToken,
      },
    }),
  logout: async () => instance.post(`${endpoint.AUTH}/logout`),
};

export default authServices;
